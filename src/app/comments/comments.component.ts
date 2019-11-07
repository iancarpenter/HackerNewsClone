import { Component, OnInit, Input } from '@angular/core';
import { HackerNewsService } from '../services/hackernews.service';
import { StoryTransferService } from '../services/story-transfer.service';

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
  storyID: number;


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
        if (this.deleted) {
          console.log('deleted is ' + this.deleted);
          console.log('deleted type ' + typeof this.deleted);
          console.log('deleted text ' + this.text);
          console.log('deleted object ', this);
        }
      },
      (err) => console.log(`error ${err}`),
      // () => console.log('done')
    );
  }

}
