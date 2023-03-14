import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// IMPORT [component > pages]
import { AboutComponent } from './components/pages/about/about.component';
import { EditComponent } from './components/pages/edit/edit.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MomentComponent } from './components/pages/moment/moment.component';
import { NewMomentComponent } from './components/pages/new-moment/new-moment.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'moments/new', component: NewMomentComponent},
  {path: 'moments/:id', component: MomentComponent},
  {path: 'moments/edit/:id', component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
