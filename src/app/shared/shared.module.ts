import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizedDatePipe } from './pipes/localizedDate.pipe';
import { LocalizedNumberPipe } from './pipes/localizedNumber.pipe';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [LocalizedDatePipe, LocalizedNumberPipe],
  exports: [
    ReactiveFormsModule,
    TranslateModule,
    LocalizedDatePipe,
    LocalizedNumberPipe
  ]
})
export class SharedModule {}
