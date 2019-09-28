import { Component, OnInit } from '@angular/core';
import { HackerNewsService } from './shared/hackernews.service';
import { AvailableStories } from './shared/enums.model';
import { log } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  newStories: any[];
  topStories: any[];
  bestStories: any[];

  constructor(private hnService: HackerNewsService) {}

  ngOnInit(): void {
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

  // return a string with number hour(s) | minute(s) ago
  // 8 hours ago or 1 minute ago
  calculateTimePosted(timePosted: number): string {

    const timePostedAsDate = new Date(timePosted * 1000).getTime();

    const now = new Date().getTime();

    const timeDifference = Math.floor(now - timePostedAsDate) / 1000;

    // pass to formatting

    const days = Math.floor(timeDifference / 86400);
    const hours = Math.floor(timeDifference / 3600) % 24;
    const minutes = Math.floor(timeDifference / 60) % 60;
    // not interested in seconds
    // const seconds = Math.floor(timeDifference % 60);

    if (days > 0) {
      if (days === 1) {
        return days + ' day ago';
      } else if (days > 1) {
        return days + ' days ago';
      }
    } else if (hours > 0) {
      if (hours === 1) {
        return hours + ' hour ago';
      } else if (hours > 1) {
        return hours + ' hours ago';
      }
    } else if (minutes === 1) {
        return minutes + ' minute ago';
      } else if (minutes !== 1) {
        return minutes + ' minutes ago';
      }
    }
}

