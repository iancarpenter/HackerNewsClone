import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StoryTransferService {

    private storyID: number;

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
