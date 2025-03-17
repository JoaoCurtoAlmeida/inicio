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
    this.isDarkMode = !this.isDarkMode;
    
    this.themeService.setTheme(newTheme);
    this.applyTheme();
    this.ModoMenuDarkLight();
  }

  

  private applyTheme() {
    const themeClass = this.isDarkMode ? 'dark-theme' : 'light-theme';
    this.renderer.removeClass(document.body, 'light-theme');
    this.renderer.addClass(document.body, themeClass);
    this.activeScroll();

  }
  private activeScroll = () => {
    if (!this.menu) return;


    if (this.isDarkMode) {
      this.menu.classList.add('background-menu-dark');
      this.menu.classList.remove('background-menu-light');
    } else {
      this.menu.classList.add('background-menu-light');
      this.menu.classList.remove('background-menu-dark');
    }
  
    if (window.scrollY == 0) {
      this.menu.classList.remove('background-menu-dark', 'background-menu-light');
    }
  };
  
  private ModoMenuDarkLight() {
    const myDivMoon = this.el.nativeElement.querySelector('.moon');
    const myDivSun = this.el.nativeElement.querySelector('.sun');

    this.isOpenMode = !this.isOpenMode;
    if (this.isOpenMode) {
      this.renderer.addClass(myDivMoon, 'off-icon-mode');
      this.renderer.addClass(myDivSun, 'on-icon-mode');

    } else {
      this.renderer.removeClass(myDivSun, 'on-icon-mode');
      this.renderer.removeClass(myDivMoon, 'off-icon-mode');



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
