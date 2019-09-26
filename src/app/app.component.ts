import { Component, OnInit } from '@angular/core';
import { HackerNewsService } from './shared/hackernews.service';
import { AvailableStories } from './shared/enums.model';

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
}
