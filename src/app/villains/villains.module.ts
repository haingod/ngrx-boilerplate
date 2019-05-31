import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { VillainsComponent } from './villains/villains.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: VillainsComponent }
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [VillainsComponent],
  declarations: [
    VillainsComponent,
  ],
})
export class VillainsModule {}
