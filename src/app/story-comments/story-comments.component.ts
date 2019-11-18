import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoryTransferService } from '../services/story-transfer.service';
import { HackerNewsService } from '../services/hackernews.service';

import * as moment from 'moment';
import { Router, NavigationEnd } from '@angular/router';
import { log } from 'util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-story-comments',
  templateUrl: './story-comments.component.html',
  styleUrls: ['./story-comments.component.css']
})
export class StoryCommentsComponent implements OnInit, OnDestroy {

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
  private navigationSubscription: Subscription;
  private routeUrl: string;

  constructor(private storyTransferService: StoryTransferService,
              private hackerNewsService: HackerNewsService,
              private router: Router) {
                // story the url so the story id can be extracted from it
                this.navigationSubscription = this.router.events.subscribe((e: any) => {
                  if (e instanceof NavigationEnd) {
                    this.routeUrl = e.url;
                  }
                });
  }

  ngOnInit() {
    this.storyID = this.storyTransferService.getStoryID();
    // When this page is reloaded it the storyID has been lost
    // so use the local function to obtain it from the url
    if (this.storyID === undefined) {
      this.storyID = this.getStoryIDAfterPageReload();
    }
    this.storyTransferService.deleteStoryID();
    this.getStoryDetails(this.storyID);
  }

  // Assign the response from the observable to this class so that it's
  // properties are available to be used by the template
  getStoryDetails(storyID: number) {
    this.hackerNewsService.getStorybyId(storyID).subscribe(
      (data) => {
        Object.assign(this, data);
        // the comment times are converted using the moment library
        this.time = moment.unix(+this.time).fromNow();
      },
      (err) => console.log(`error ${err}`),
    );
  }

  // extract the story id from the url and return to caller
  // the url will be of the format /item/NNNNNNNN so this method
  // will return NNNNNNNN
  getStoryIDAfterPageReload(): number {
    const extractedStoryID = parseInt(this.routeUrl.substr(6, this.routeUrl.length), 10);
    this.storyTransferService.setStoryID(extractedStoryID);
    return extractedStoryID;
  }

  // avoid memory leaks otherwise the url assignment is run on every
  // navigationEnd event.
  ngOnDestroy() {
     if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
     }
  }

}
