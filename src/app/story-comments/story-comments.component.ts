import { Component, OnInit } from '@angular/core';
import { StoryTransferService } from '../services/story-transfer.service';
import { HackerNewsService } from '../services/hackernews.service';

import * as moment from 'moment';
import { Router, NavigationEnd } from '@angular/router';

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
  private navigationSubscription;

  constructor(private storyTransferService: StoryTransferService,
              private hackerNewsService: HackerNewsService,
              private router: Router) {
                this.navigationSubscription = this.router.events.subscribe((e: any) => {
                  if (e instanceof NavigationEnd) {
                    console.log('Constructor Firing...');
                    // this.storyID = this.storyTransferService.getStoryID();
                    // this.storyTransferService.deleteStoryID();
                    // this.getStoryDetails(this.storyID);
                  }
                });
  }

  ngOnInit() {
    console.log('ngOnInit Firing...');
    console.log('this.storyTransferService.getStoryID() is ', this.storyTransferService.getStoryID());
    
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
