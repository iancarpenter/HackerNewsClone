import { Component, OnInit, Input } from '@angular/core';
import { HackerNewsService } from '../services/hackernews.service';
import { StoryTransferService } from '../services/story-transfer.service';

import * as moment from 'moment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() id: number;
  @Input() level: number;
  public by: string;
  public kids: string[];
  public text: string;
  public time: string;
  public hasCommentTree: boolean;
  public deleted: boolean;

  private storyID: number;

  constructor(private storyTransferService: StoryTransferService,
              private hackerNewsService: HackerNewsService) { }

  ngOnInit() {

    this.storyID = this.storyTransferService.getStoryID();
    // first time is the arrival from the home page subsequent calls are the
    // comments
    if (this.storyID !== null) {
      this.storyTransferService.deleteStoryID();
      this.getCommentDetails(this.storyID);
    } else {
      this.getCommentDetails(this.id);
    }
  }

  getCommentDetails(storyID: number) {
    this.hackerNewsService.getCommentTree(storyID).subscribe(
      (data) => {
        Object.assign(this, data);
        this.time = moment.unix(+this.time).fromNow();
      },
      (err) => console.log(`error ${err}`),
    );
  }

}
