import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsTransferService {

  private commentIDs: number[];

  constructor() { }

  setCommentIDs(commentIDs: number[]) {
    this.commentIDs = commentIDs;
  }

  getCommentIDs(): number[] {
    return this.commentIDs;
  }

  // causing problems with comments components
  // clearData() {
  //   this.getCommentIDs = undefined;
  // }

}
