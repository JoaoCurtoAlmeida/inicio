import { Component, Renderer2, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../services/theme.service';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';
@Component({
  selector: 'app-page1',
  imports: [ToggleButtonModule, ReactiveFormsModule, MatIconModule, FormsModule],
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
  standalone: true,
})
export class Page1Component implements OnInit, OnDestroy {
  private menu: HTMLElement | null = null;
  private isDarkMode = false;
  private isOpenMode = false;
  checked: boolean = false;
  constructor(private renderer: Renderer2, private el: ElementRef, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.menu = document.querySelector('#containerId');
    window.addEventListener('scroll', this.activeScroll);
    this.isDarkMode = this.themeService.getTheme() === 'dark-theme';
    this.applyTheme();

    // Iniciando a navegação móvel
    const mobileNavbar = new MobileNavbar('.mobile-menu', '.nav-list', '.nav-list li');
    mobileNavbar.init();
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.activeScroll);
  }

  toggleTheme() {
    const newTheme = this.isDarkMode ? 'dark-theme' : 'light-theme';

    this.ToggleMode();
    this.themeService.setTheme(newTheme);
    this.applyTheme();
  }

  menuMode() {
    this.MenuModeActions();
  }

  private ToggleMode() {
    this.isDarkMode = !this.isDarkMode;

    const myDivToggle = this.el.nativeElement.querySelector('.toggle');
    const myDivInfoMode1 = this.el.nativeElement.querySelector('.info-mode1');
    const myDivInfoMode2 = this.el.nativeElement.querySelector('.info-mode2');

    const myDivToggleMobile = this.el.nativeElement.querySelector('.toggle-mobile');
    const myDivInfoMobileMode1 = this.el.nativeElement.querySelector('.info-mode1-mobile');
    const myDivInfoMobileMode2 = this.el.nativeElement.querySelector('.info-mode2-mobile');

    if (!this.isDarkMode) {
      this.renderer.removeClass(myDivToggle, 'dark-mode-toggle');
      this.renderer.addClass(myDivToggle, 'light-mode-toggle');
      this.renderer.removeClass(myDivToggleMobile, 'dark-mode-toggle');
      this.renderer.addClass(myDivToggleMobile, 'light-mode-toggle');
      this.renderer.removeClass(myDivInfoMode1, 'info-on');
      this.renderer.addClass(myDivInfoMode2, 'info-on');
      this.renderer.removeClass(myDivInfoMobileMode1, 'info-on');
      this.renderer.addClass(myDivInfoMobileMode2, 'info-on');
    } else {
      this.renderer.removeClass(myDivToggle, 'light-mode-toggle');
      this.renderer.addClass(myDivToggle, 'dark-mode-toggle');
      this.renderer.removeClass(myDivToggleMobile, 'light-mode-toggle');
      this.renderer.addClass(myDivToggleMobile, 'dark-mode-toggle');
      this.renderer.removeClass(myDivInfoMode2, 'info-on');
      this.renderer.addClass(myDivInfoMode1, 'info-on');
      this.renderer.removeClass(myDivInfoMobileMode2, 'info-on');
      this.renderer.addClass(myDivInfoMobileMode1, 'info-on');
    }
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

  private MenuModeActions() {
    const myDivMenu = this.el.nativeElement.querySelector('.container-mobile');
    this.isOpenMode = !this.isOpenMode;
    if (this.isOpenMode) {
      this.renderer.addClass(myDivMenu, 'menu-on');
    } else {
      this.renderer.removeClass(myDivMenu, 'menu-on');
    }
  }
}

class MobileNavbar {
  private mobileMenu: HTMLElement | null;
  private navList: HTMLElement | null;
  private navLinks: NodeListOf<HTMLElement>;
  private activeClass: string;

  constructor(mobileMenu: string, navList: string, navLinks: string) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = 'active';

    // Bindando o handleClick para garantir que o 'this' funcione corretamente
    this.handleClick = this.handleClick.bind(this);
  }

  private animateLinks(): void {
    this.navLinks.forEach((link, index) => {
      link.style.animation = link.style.animation
        ? ''
        : `navLinkFade 0.5s ease forwards ${index / 8 + 0.3}s`;
    });
  }

  private handleClick(): void {
    if (this.navList && this.mobileMenu) {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }
  }

  private addClickEvent(): void {
    if (this.mobileMenu) {
      this.mobileMenu.addEventListener('click', this.handleClick);
    }
  }

  public init(): MobileNavbar {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}
