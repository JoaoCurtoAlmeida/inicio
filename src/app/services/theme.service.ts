import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: string = 'dark-theme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setTheme(theme: 'light-theme' | 'dark-theme') {
    this.renderer.removeClass(document.body, this.currentTheme);
    this.currentTheme = theme;
    this.renderer.addClass(document.body, this.currentTheme);
  }

  getTheme(): string {
    return this.currentTheme;
  }
}

