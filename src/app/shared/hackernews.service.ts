import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class HackerNewsService {

    constructor(private http: HttpClient) {}

    getTopStories() {
        return this.getIdsForTopStories().pipe (
            mergeMap((ids) => forkJoin(ids.map((id) => this.getStoryDetails(id)))),
        );
    }

    getStoryDetails(id: number) {
        // note the backtick used instead of quotes because of the ${id} parameter
        return this.http.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    }

    getIdsForTopStories(): Observable<any> {
        return this.http.get('https://hacker-news.firebaseio.com/v0/topstories.json', {
            params: {
                orderBy: '"$key"',
                limitToFirst: '10',
            }
        });
    }
}
