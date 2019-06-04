import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../../core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  selected: Hero;
  heroes$: Observable<Hero[]>;
  pageInfo$: Observable<any>;
  loading$: Observable<boolean>;
  isInsertingUser$: Observable<boolean>;
  isUpdatingUser$: Observable<boolean>;
  JSON: any;
  apiUrl: string;

  constructor(private heroService: HeroService) {
    this.heroes$ = heroService.items;
    this.loading$ = heroService.isLoadingItems;
    this.pageInfo$ = heroService.pageInfo;
    this.isInsertingUser$ = heroService.isInserting;
    this.isUpdatingUser$ = heroService.isUpdating;

    this.apiUrl = 'https://reqres.in/api/users';
    this.JSON = JSON;
  }

  ngOnInit() {
    this.heroService.loadAll(this.apiUrl);
  }

  add(hero: Hero) {
    this.heroService.addOne(this.apiUrl, hero);
  }

  close() {
    this.selected = null;
  }

  delete(hero: Hero) {
    this.heroService.deleteOne(this.apiUrl, hero);
    this.close();
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  getHeroes() {
    this.heroService.loadAll(this.apiUrl);
    this.close();
  }

  select(hero: Hero) {
    this.selected = hero;
  }

  update(hero: Hero) {
    this.heroService.updateOne(this.apiUrl, hero);
  }

  getPaginatorData(event) {
    this.heroService.loadAll(`${this.apiUrl}?page=${event.pageIndex + 1}`);
  }
}
