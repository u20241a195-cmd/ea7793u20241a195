import {Component, computed, effect, inject, signal} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {FooterContent} from '../footer-content/footer-content';
import {environment} from '../../../../environments/environment';

/**
 * Application shell: toolbar with language switcher, sidenav navigation and routed content.
 *
 * @author Sofia Diaz Yurivilca
 */
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,
    RouterLink, RouterLinkActive,
    MatSidenavModule, MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    TranslatePipe,
    FooterContent],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  readonly collapsed = signal(false);
  readonly options = [
    {link: '/home', label: 'menu-home', icon: 'home'},
    {link: '/reservations/new', label: 'menu-new-reservation', icon: 'add_circle'}
  ];

  /**
   * Language currently applied to the interface.
   */
  readonly currentLanguage = computed(() => this.translate.currentLang() ?? environment.defaultLanguage);

  /**
   * Creates an instance of Layout and keeps the document language in sync with the selection.
   */
  constructor() {
    effect(() => {
      this.document.documentElement.lang = this.currentLanguage();
    });
  }

  toggleMenu(): void {
    this.collapsed.update(value => !value);
  }

  /**
   * Switches the interface language.
   * @param language - Language code to apply.
   */
  switchLanguage(language: string): void {
    this.translate.use(language);
  }
}
