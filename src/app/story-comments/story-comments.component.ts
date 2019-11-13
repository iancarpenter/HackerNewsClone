import { Component, OnInit } from '@angular/core';
import { StoryTransferService } from '../services/story-transfer.service';
import { HackerNewsService } from '../services/hackernews.service';

import * as moment from 'moment';

@Component({
  selector: 'app-story-comments',
  templateUrl: './story-comments.component.html',
  styleUrls: ['./story-comments.component.css']
})
export class StoryCommentsComponent implements OnInit {

  public by: string;
  public id: number;
  public score: number;
  public text: string;
  public title: string;
  public time: string;
  public type: string;
  public kids: string[];
  public url: string;

  private storyID: number;

  constructor(private storyTransferService: StoryTransferService,
              private hackerNewsService: HackerNewsService) { }

  ngOnInit() {
    this.storyID = this.storyTransferService.getStoryID();
    this.storyTransferService.deleteStoryID();
    this.getStoryDetails(this.storyID);
  }

  getStoryDetails(storyID: number) {
    this.hackerNewsService.getStorybyId(storyID).subscribe(
      (data) => {
        Object.assign(this, data);
        this.time = moment.unix(+this.time).fromNow();
      },
      (err) => console.log(`error ${err}`),
    );
  }

}
