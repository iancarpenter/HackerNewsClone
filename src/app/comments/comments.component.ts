import { Component, OnInit } from '@angular/core';
import { CommentsTransferService } from '../services/comments-transfer.service';
import { HackerNewsService } from '../services/hackernews.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  commentIDs: number[];
  commentDetails: any[];

  constructor(private commentsTransferService: CommentsTransferService,
              private hackerNewsService: HackerNewsService) { }

  ngOnInit() {
    this.getCommentDetails(this.commentsTransferService.getCommentIDs());
    this.hackerNewsService.getCommentTree(this.commentsTransferService.getCommentIDs()).subscribe(
      data => {
        console.log('comment tree is ', data );
        Object.assign(this, data);
        // if (data && data.deleted) {
        //   this.hasBeenDeleted.emit(this.id);
        // }
        // this.time = moment.unix(+this.time).fromNow();
        // this.hasCommentTree = true;
      },
      error => console.log(error)
    );

  }

  getCommentDetails(commentIds: number[]) {
    this.commentDetails = this.hackerNewsService.getComments(commentIds);
    console.log(this.commentDetails);
  }
}
