import { Component, Renderer2, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-page1',
  imports: [ToggleSwitchModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
  standalone: true,
})
export class Page1Component implements OnInit, OnDestroy {
  private menu: HTMLElement | null = null;
  private isDarkMode = false;
  private isOpenMode = false;

  constructor(private renderer: Renderer2, private el: ElementRef, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.menu = document.querySelector('#containerId');
    window.addEventListener('scroll', this.activeScroll);
    this.isDarkMode = this.themeService.getTheme() === 'dark-theme';
    this.applyTheme();
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.activeScroll);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const newTheme = this.isDarkMode ? 'dark-theme' : 'light-theme';
    this.themeService.setTheme(newTheme);
    this.applyTheme();
  }

  private applyTheme() {
    const themeClass = this.isDarkMode ? 'dark-theme' : 'light-theme';
    this.renderer.removeClass(document.body, 'dark-theme');
    this.renderer.removeClass(document.body, 'light-theme');
    this.renderer.addClass(document.body, themeClass);
    this.activeScroll();
  }

  private activeScroll = () => {
    if (!this.menu) return;
    if (window.scrollY > 0) {
      this.menu.classList.add('on-scroll');
      this.menu.classList.remove('off-scroll');
    } else {
      this.menu.classList.remove('off-scroll');
      this.menu.classList.add('on-scroll');
    }

    if (this.isDarkMode) {
      this.menu.classList.add('background-menu-dark');
      this.menu.classList.remove('background-menu-light');
    } else {
      this.menu.classList.add('background-menu-light');
      this.menu.classList.remove('background-menu-dark');
    }

    if (window.scrollY === 0) {
      this.menu.classList.remove('background-menu-dark', 'background-menu-light');

    }
  }
    menuMode() {
      const myDivMenu = this.el.nativeElement.querySelector('.container-mobile');
      this.isOpenMode = !this.isOpenMode;

      if (this.isOpenMode) {
        this.renderer.removeClass(myDivMenu, 'menu-off');
        this.renderer.addClass(myDivMenu, 'menu-on');
      } else {
        this.renderer.removeClass(myDivMenu, 'menu-on');
      }
    }


    
}