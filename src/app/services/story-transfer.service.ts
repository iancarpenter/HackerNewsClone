import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
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

    public setStoryTitle(storyTitle: string) {
        this.storyTitle = storyTitle;
    }

    public getStoryTitle() {
        return this.storyTitle;
    }

    public deleteStoryTitle() {
        this.storyTitle = null;
    }

}
