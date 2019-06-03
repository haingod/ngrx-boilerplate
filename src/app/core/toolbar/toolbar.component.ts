import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  labTitle = this.translate.instant('app.title');
  labState = this.translate.instant('app.description');
  constructor(private translate: TranslateService) {}
  changeLang(language: string) {
    this.translate.use(language);
    localStorage.setItem('locale', language);
  }
}
