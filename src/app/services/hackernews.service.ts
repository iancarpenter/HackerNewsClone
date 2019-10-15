import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AvailableStories } from '../models/enums.model';

@Injectable({ providedIn: 'root' })

export class HackerNewsService {

    private readonly newStoriesURL: string = 'https://hacker-news.firebaseio.com/v0/newstories.json';
    private readonly topStoriesURL: string = 'https://hacker-news.firebaseio.com/v0/topstories.json';
    private readonly bestStoriesURL: string = 'https://hacker-news.firebaseio.com/v0/beststories.json';

    comments = new Array();

    constructor(private http: HttpClient) { }

    // marshalling method - obtains the ids for the story and then passes them on to the next
    // observable to obtain the details for the id's supplied
    getStories(storyRequested: number) {

        const storyURL = this.getURL(storyRequested);

        return this.getIdsForStories(storyURL).pipe(
            mergeMap((ids) => forkJoin(ids.map((id) => this.getStoryDetails(id)))),
        );
    }

    getComments(commentIDs: number[]) {

        console.log('Comment id length! ', this.comments.length);
        console.log('These are the comment ids supplied ', commentIDs);

        this.comments = [];

        commentIDs.forEach(((id) => {
            // console.log(this.getStoryDetails(id).subscribe(val => console.log(val)));
            this.getStoryDetails(id).subscribe(val => (
                this.comments.push(val)));
        }));

        // commentIDs.forEach(((id) => {
        //     // console.log(this.getStoryDetails(id).subscribe(val => console.log(val)));
        //     this.getCommentTree(id).subscribe(val => (
        //         this.comments.push(val)));
        // }));
        // console.log('about to call get comment tree ');
        // console.log(this.getCommentTree(21166839).subscribe(val => console.log(val)));

        return this.comments;
    }

    // getCommentTree(commentId): Observable<any> {
    //     return this.http
    //       .get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
    //       .pipe(map(data => console.log(data)));
    //   }

    getURL(storyRequested: number): string {

        let storyRequestedURL: string;

        switch (storyRequested) {

            case AvailableStories.new:
                storyRequestedURL = this.newStoriesURL;
                break;

            case AvailableStories.top:
                storyRequestedURL = this.topStoriesURL;
                break;

            case AvailableStories.best:
                storyRequestedURL = this.bestStoriesURL;
                break;
        }
        return storyRequestedURL;
    }

    // returns an array of ids for the story
    getIdsForStories(url: string): Observable<any> {
        return this.http.get(url, {
            params: {
                orderBy: '"$key"',
                limitToFirst: '10',
            }
        });
    }

    // returns JSON containing the details of the post
    getStoryDetails(id: number) {
        // note the backtick used instead of quotes because of the ${id} parameter
        return this.http.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    }
}