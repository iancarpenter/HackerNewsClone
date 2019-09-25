import { Component, OnInit } from '@angular/core';
import { HackerNewsService } from './shared/hackernews.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  topStories: any[];

  constructor(private hnService: HackerNewsService) {}

  ngOnInit(): void {
    this.getTopStories();
  }

  getTopStories() {
    this.hnService.getTopStories().subscribe((stories) => {
      this.topStories = stories;
      console.log(this.topStories);
    });
  }
}
