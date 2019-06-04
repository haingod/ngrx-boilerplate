import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedNumber',
  pure: false // required to update the value when currentLang is changed
})
export class LocalizedNumberPipe implements PipeTransform {
  private value: string | null;
  private lastNumber: any;
  private lastLang: string;

  constructor(private translate: TranslateService) {}

  transform(number: any, digitsInfo: string = '1.0-3'): any {
    const currentLang = this.translate.currentLang;

    // if we ask another time for the same date & locale, return the last value
    if (number === this.lastNumber && currentLang === this.lastLang) {
      return this.value;
    }

    this.value = new DecimalPipe(currentLang).transform(number, digitsInfo);
    this.lastNumber = number;
    this.lastLang = currentLang;

    return this.value;
  }
}
