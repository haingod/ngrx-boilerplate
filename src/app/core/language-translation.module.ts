/**
 * This module is used to language translations.
 * The translations are saved in a json file in /src/app/assets/i18n directory
 * Docs: https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular7-app-with-ngx-translate
 */
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import ngx-translate and the http loader
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

// ngx-translate - required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: 'assets/translate/header/', suffix: '.json' },
    { prefix: 'assets/translate/dashboard/', suffix: '.json' }
  ]);
}

@NgModule({
  declarations: [],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [TranslateModule]
})
export class LanguageTranslationModule {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'vn']);

    const savedLocale = localStorage.getItem('locale');
    if (savedLocale) {
      // Get saved locale selection
      this.translate.use(savedLocale);
    } else {
      // Gets Default language from browser if available, otherwise set English ad default
      this.translate.setDefaultLang('en');
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang.match(/en|vn/) ? browserLang : 'en');
    }
  }
}
