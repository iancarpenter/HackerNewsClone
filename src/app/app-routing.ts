import { Routes, RouterModule } from '@angular/router';
// import { HomeComponent } from './components/home/home.component';
import { HomeComponent } from './components/home/home.component';
import { StoryCommentsComponent } from './components/story-comments/story-comments.component';


const routes: Routes = [
    { path: 'topstories', data: { feed: 'topstories' }, component: HomeComponent },
    { path: '', redirectTo: 'topstories', pathMatch: 'full' },
    { path: 'newstories', data: { feed: 'newstories' }, component: HomeComponent },
    { path: 'beststories', data: { feed: 'beststories' }, component: HomeComponent },
    { path: 'item/:itemId', component: StoryCommentsComponent, runGuardsAndResolvers: 'always' },
];

export const routing = RouterModule.forRoot(routes);
