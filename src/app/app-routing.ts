import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StoryCommentsComponent } from './story-comments/story-comments.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'comments', component: StoryCommentsComponent }
];

export const routing = RouterModule.forRoot(routes);
