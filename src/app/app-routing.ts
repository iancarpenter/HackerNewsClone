import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StoryCommentsComponent } from './story-comments/story-comments.component';

const routes: Routes = [
    { path: 'topstories', data: { feed: 'topstories' }, component: HomeComponent },
    { path: '', redirectTo: 'topstories', pathMatch: 'full' },
    { path: 'newstories', data: { feed: 'newstories' }, component: HomeComponent },
    { path: 'beststories', data: { feed: 'beststories' }, component: HomeComponent },
    { path: 'item/:itemId', component: StoryCommentsComponent }
];

export const routing = RouterModule.forRoot(routes);
