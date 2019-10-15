import { Component, OnInit } from '@angular/core';
import { CommentsTransferService } from '../services/comments-transfer.service';
import { HackerNewsService } from '../services/hackernews.service';
import { log } from 'util';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  commentIDs: number[];
  commentDetails: any[];
  childCommentDetails: any[];

  constructor(private commentsTransferService: CommentsTransferService,
              private hackerNewsService: HackerNewsService) { }

  ngOnInit() {
    this.addCommentsToLocalArray();
    this.getCommentDetails();
  }

  addCommentsToLocalArray() {
    this.commentIDs = this.commentsTransferService.getCommentIDs();
  }

  getCommentDetails() {
    this.commentDetails = this.hackerNewsService.getComments(this.commentIDs);
    console.log(this.commentDetails);
  }

  getChildComments(childCommentIDs: any[]) {
    this.childCommentDetails = this.hackerNewsService.getComments(childCommentIDs);
    console.log(this.childCommentDetails);
  }

  decodeHTML(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }
}
