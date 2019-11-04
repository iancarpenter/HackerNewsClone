import { Component, OnInit, Input } from '@angular/core';
import { HackerNewsService } from '../services/hackernews.service';

@Component({
  selector: 'app-child-comments',
  templateUrl: './child-comments.component.html',
  styleUrls: ['./child-comments.component.css']
})
export class ChildCommentsComponent implements OnInit {

  @Input() id: number;
  isActivated: boolean;
  // childCommentDetails: any[] = [];
  d;

  constructor(private hackerNewsService: HackerNewsService) { }

  ngOnInit() {
    this.getChildCommentDetail(this.id);
  }
  getChildCommentDetail(id: number) {
    this.hackerNewsService.getCommentTree(id).subscribe(
      (data) => {
        if (data !== null ) {
          this.d = data;
          console.log(`type of d is ${typeof this.d}`);
          console.log(`d text is ${this.d.text}`);
        }
      },
      (err) => console.log(`error ${err}`),
      () => console.log('done')
    );
  }

  toggleActivate() {
    this.isActivated = !this.isActivated;
  }

}
