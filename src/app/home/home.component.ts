import { Component, OnInit } from '@angular/core';
import { AvailableStories } from '../models/enums.model';
import { HackerNewsService } from '../services/hackernews.service';
import { Router } from '@angular/router';
import { StoryTransferService } from '../services/story-transfer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newStories: any[];
  topStories: any[];
  bestStories: any[];

  constructor(private hnService: HackerNewsService,
              private router: Router,
              private storyTransferService: StoryTransferService) {}

  ngOnInit() {
    this.getStories(AvailableStories.new);
    this.getStories(AvailableStories.top);
    this.getStories(AvailableStories.best);
  }

  getStories(whichStory: number) {
    this.hnService.getStories(whichStory).subscribe((stories) => {

      console.log(stories);

      switch (whichStory) {
        case AvailableStories.new:
          this.newStories = stories;
          break;
        case AvailableStories.top:
          this.topStories = stories;
          break;
        case AvailableStories.best:
          this.bestStories = stories;
          break;
      }
    });
  }

  // return a string with number hour(s) | minute(s) when the post was made ago
  // 2 days ago or 8 hours ago or 1 minute ago
  getTimePosted(timePosted: number): string {

    const timeDifference = this.calculateTimeDifference(timePosted);

    const { days, hours, minutes } = this.splitTimeIntoDaysHoursMins(timeDifference);

    const formattedTimePosted = this.getFormattedTimePosted(days, hours, minutes);

    return formattedTimePosted;

  }

  // return the time difference between right now and timePosted
  private calculateTimeDifference(timePosted: number): number {

    const timePostedAsDate = new Date(timePosted * 1000).getTime();

    const now = new Date().getTime();

    const timeDifference = Math.floor(now - timePostedAsDate) / 1000;

    return timeDifference;
  }

  // split the time difference into its constituent parts; days, hours and minutes
  private splitTimeIntoDaysHoursMins(timeDifference: number) {

    const days = Math.floor(timeDifference / 86400);

    const hours = Math.floor(timeDifference / 3600) % 24;

    const minutes = Math.floor(timeDifference / 60) % 60;
    // not interested in seconds but here for completeness
    // const seconds = Math.floor(timeDifference % 60);

    return { days, hours, minutes };
  }

  // return the formatted string showing plural and singular words as appropriate
  private getFormattedTimePosted(days: number, hours: number, minutes: number): string {

    let formattedTimePosted: string;

    if (days > 0) {
      if (days === 1) {
        formattedTimePosted = days + ' day ago';
      } else if (days > 1) {
        formattedTimePosted = days + ' days ago';
      }
    } else if (hours > 0) {
      if (hours === 1) {
        formattedTimePosted = hours + ' hour ago';
      } else if (hours > 1) {
        formattedTimePosted = hours + ' hours ago';
      }
    } else if (minutes === 1) {
      formattedTimePosted = minutes + ' minute ago';
    } else if (minutes !== 1) {
      formattedTimePosted = minutes + ' minutes ago';
    }
    return formattedTimePosted;
  }

  goToComments(storyID: number) {
    this.storyTransferService.setStoryID(storyID);
    this.router.navigateByUrl('/comments');
  }
}
