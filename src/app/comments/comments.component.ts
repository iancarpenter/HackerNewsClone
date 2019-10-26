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
  isActivated: boolean;

  constructor(private commentsTransferService: CommentsTransferService,
              private hackerNewsService: HackerNewsService) { }

  ngOnInit() {
    this.getCommentDetails(this.commentsTransferService.getCommentIDs());
  }

  getCommentDetails(commentIds: number[]) {
     this.commentDetails = this.hackerNewsService.getComments(commentIds);
  }

  toggleActivate() {
    this.isActivated = !this.isActivated;
  }


}
