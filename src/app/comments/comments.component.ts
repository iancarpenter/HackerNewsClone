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

  storyID: number;


  constructor(private storyTransferService: StoryTransferService,
              private hackerNewsService: HackerNewsService) { }

  ngOnInit() {
    this.storyID = this.storyTransferService.getStoryID();
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
      },
      (err) => console.log(`error ${err}`),
      // () => console.log('done')
    );
  }

}
