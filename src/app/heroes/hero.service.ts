import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { actions as testActions, selectors as testSelectors } from '../store/testStore';
import { EntityService } from '../store/entityStore/entity.service';

@Injectable({ providedIn: 'root' })
export class HeroService extends EntityService {
  constructor(store: Store<any>) {
    super(store, testActions, testSelectors);
  }
}
