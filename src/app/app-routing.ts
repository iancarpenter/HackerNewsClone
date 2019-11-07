import { Routes, RouterModule } from '@angular/router';
import { CommentsComponent } from './comments/comments.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'comments', component: CommentsComponent }
];

export const routing = RouterModule.forRoot(routes);
