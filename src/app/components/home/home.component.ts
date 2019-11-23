import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StoryTransferService } from '../../services/story-transfer.service';
import { HackerNewsService } from 'src/app/services/hackernews.service';

import * as moment from 'moment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newStories: any[];
  topStories: any[];
  bestStories: any[];

  stories: any[];
  whichStory: string;

  constructor(private hnService: HackerNewsService,
              private router: Router,
              private storyTransferService: StoryTransferService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.whichStory = this.route.snapshot.data.feed;
    this.getStories(this.whichStory);
  }

  getStories(whichStory: string) {
    this.hnService.getStories(whichStory).subscribe((stories) => {
      this.stories = stories;
    });
  }

  getTimePosted(timePosted: number): string {
    return moment.unix(timePosted).fromNow();
  }

  goToComments(storyID: number) {
    this.storyTransferService.setStoryID(storyID);
    this.router.navigateByUrl('/item/' + storyID);
  }
}
