import { Component, OnInit, Input } from '@angular/core';
import { HackerNewsService } from '../services/hackernews.service';

@Component({
  selector: 'app-child-comments',
  templateUrl: './child-comments.component.html',
  styleUrls: ['./child-comments.component.css']
})
export class ChildCommentsComponent implements OnInit {

  @Input() id: number;
  commentIDs: number[];
  commentDetails: any[];
  isActivated: boolean;
  childCommentDetails: any[] = [];
  childComment: any;

  constructor(private hackerNewsService: HackerNewsService) { }

  ngOnInit() {
    this.getChildCommentDetail(this.id);
  }
  getChildCommentDetail(id: number) {
    // if (id) {
    //   console.log(`the id passed in is ${id}`);
    // }
    this.hackerNewsService.getCommentTree(id).subscribe(
      // Object.assign(this, data);
      // try {
      //   console.log(`data ${data.text}`);
      //   Object.assign(this, this.childCommentDetails);
      // } catch (e) {}

      // tslint:disable-next-line:max-line-length
      (data) => {if (data !== null ) { this.childCommentDetails.push({ data }); }}, // { console.log(data); }}, // console.log(data), // this.childCommentDetails.push({data}),
      (err) => console.log(`error ${err}`),
      () => console.log('done')
    );

    console.log(this.childCommentDetails);

  }

  // getCommentDetails(commentIds: number[]) {
  //    // this.commentDetails = this.hackerNewsService.getComments(commentIds);
  //    this.commentDetails = this.hackerNewsService.getComments([1327798, 21328394, 21328114, 21328002]);
  //    console.log(`this.commentDetails ${this.commentDetails}`);
  // }

  toggleActivate() {
    this.isActivated = !this.isActivated;
  }

}
