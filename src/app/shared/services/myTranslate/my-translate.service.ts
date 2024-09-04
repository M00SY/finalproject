import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(
    private _TranslateService: TranslateService,
    @Inject(PLATFORM_ID) private platId: object
  ) {
    if (isPlatformBrowser(this.platId)) {
      this._TranslateService.setDefaultLang('en');

      const savedLang = localStorage.getItem('lang');

      if (savedLang) {
        this._TranslateService.use(savedLang);
      }

      this.changeDirection();
    }
  }

  changeDirection(): void {
    if (localStorage.getItem('lang') === 'en') {
      document.dir = 'ltr';
    } else if (localStorage.getItem('lang') === 'ar') {
      document.dir = 'rtl';
    }
  }

  changeLang(lang: string): void {
    if (isPlatformBrowser(this.platId)) {
      localStorage.setItem('lang', lang);
    }

    this._TranslateService.use(lang);
    this.changeDirection();
  }
}
