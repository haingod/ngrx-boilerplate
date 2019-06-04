import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule, TranslateModule]
})
export class SharedModule {}
