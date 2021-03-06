import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class HackerNewsService {

    private readonly newStoriesURL: string = 'https://hacker-news.firebaseio.com/v0/newstories.json';
    private readonly topStoriesURL: string = 'https://hacker-news.firebaseio.com/v0/topstories.json';
    private readonly bestStoriesURL: string = 'https://hacker-news.firebaseio.com/v0/beststories.json';

    private readonly topstories = 'topstories';
    private readonly newstories = 'newstories';
    private readonly beststories = 'beststories';

    constructor(private http: HttpClient) { }

    // marshalling method - obtains the ids for the story and then passes them on to the next
    // observable to obtain the details for the id's supplied
    getStories(storyRequested: string) {

        const storyURL = this.getURL(storyRequested);

        return this.getIdsForStories(storyURL).pipe(
            mergeMap((ids) => forkJoin(ids.map((id) => this.getStoryDetails(id)))),
        );
    }

    getCommentTree(commentId): Observable<any> {
        return this.http
          .get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
          .pipe(map(data => data));
    }

    getURL(storyRequested: string): string {

        let storyRequestedURL: string;

        switch (storyRequested) {
            case this.newstories:
                storyRequestedURL = this.newStoriesURL;
                break;
            case this.topstories:
                storyRequestedURL = this.topStoriesURL;
                break;
            case this.beststories:
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

    getStorybyId(storyId: number): Observable<any> {
        return this.http
          .get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
          .pipe(map(data => data));
    }
}
