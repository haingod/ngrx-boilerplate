import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroService } from './hero.service';
import { HeroesComponent } from './heroes/heroes.component';
import { MaterialModule } from '../material/material.module';
import { LoadingDirective } from '../core/loading/loading.directive';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HeroesComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [HeroesComponent, HeroDetailComponent],
  declarations: [
    HeroesComponent,
    HeroDetailComponent,
    HeroListComponent,
    LoadingDirective
  ],
  providers: [HeroService]
})
export class HeroesModule {}
