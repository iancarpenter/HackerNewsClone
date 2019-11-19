import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
// service to allow components access the current story
export class StoryTransferService {

    private storyID: number;
    private storyTitle: string;

    constructor() { }

    public setStoryID(storyID: number) {
        this.storyID = storyID;
    }

    public getStoryID(): number {
        return this.storyID;
    }

    public deleteStoryID() {
        this.storyID = null;
    }
}
