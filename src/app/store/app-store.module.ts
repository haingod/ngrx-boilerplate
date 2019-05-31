import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';

import ajaxReducers from './ajaxStore';
import { reducers as testReducers } from './testStore';
import { CommonEffects } from './entityStore/commonEffects';

@NgModule({
  imports: [
    StoreModule.forRoot({ ...testReducers, ...ajaxReducers }),
    EffectsModule.forRoot([CommonEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ]
})
export class AppStoreModule {
  constructor() {}
}
