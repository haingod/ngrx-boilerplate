import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ModalComponent } from './modal/modal.component';
import { throwIfAlreadyLoaded } from './module-import-check';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LanguageTranslationModule } from './language-translation.module';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    LanguageTranslationModule,
    RouterModule // because we use <router-outlet> and routerLink
  ],
  declarations: [ModalComponent, ToolbarComponent, LoadingComponent],
  exports: [ToolbarComponent],
  entryComponents: [ModalComponent, LoadingComponent]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
