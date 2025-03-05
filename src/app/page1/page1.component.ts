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

  ////////////////////// FUNCIONES PUBLICAS //////////////////////
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
    const newTheme = this.isDarkMode ? 'dark-theme' : 'light-theme';

    this.ToggleMode();
    this.themeService.setTheme(newTheme);
    this.applyTheme();

  }

  menuMode() {
    this.MenuModeActions();
  }



  ////////////////////// FUNCIONES PUBLICAS //////////////////////








  //////////// FUNCIONES PRIVADAS  ////////////////////// 

  private ToggleMode() {
    this.isDarkMode = !this.isDarkMode;

    ///// Desktop /////

    const myDivToggle = this.el.nativeElement.querySelector('.toggle');
    const myDivInfoMode1 = this.el.nativeElement.querySelector('.info-mode1');
    const myDivInfoMode2 = this.el.nativeElement.querySelector('.info-mode2');

   ///// Mobile /////

    const myDivToggleMobile = this.el.nativeElement.querySelector('.toggle-mobile');
    const myDivInfoMobileMode1 = this.el.nativeElement.querySelector('.info-mode1-mobile');
    const myDivInfoMobileMode2 = this.el.nativeElement.querySelector('.info-mode2-mobile');



    if (!this.isDarkMode) {
      ///// Toggle Desktop //////
      this.renderer.removeClass(myDivToggle, 'dark-mode-toggle');
      this.renderer.addClass(myDivToggle, 'light-mode-toggle');

      ///// Toggle Mobile //////
      this.renderer.removeClass(myDivToggleMobile, 'dark-mode-toggle');
      this.renderer.addClass(myDivToggleMobile, 'light-mode-toggle');

      //// Info Desktop ////
      this.renderer.removeClass(myDivInfoMode1, 'info-on');
      this.renderer.addClass(myDivInfoMode2, 'info-on');

      //// Info Mobile ////
      this.renderer.removeClass(myDivInfoMobileMode1, 'info-on');
      this.renderer.addClass(myDivInfoMobileMode2, 'info-on');

    } else {
      ///// Toggle Desktop //////


      this.renderer.removeClass(myDivToggle, 'light-mode-toggle');
      this.renderer.addClass(myDivToggle, 'dark-mode-toggle');

      ///// Toggle Mobile //////

      this.renderer.removeClass(myDivToggleMobile, 'light-mode-toggle');
      this.renderer.addClass(myDivToggleMobile, 'dark-mode-toggle');

      //// Info Desktop ////
      this.renderer.removeClass(myDivInfoMode2, 'info-on');
      this.renderer.addClass(myDivInfoMode1, 'info-on');

      //// Info Mobile ////
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
    
     // Adiciona um fade-out antes da mudança

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
      this.renderer.removeClass(myDivMenu, 'menu-off');
      this.renderer.addClass(myDivMenu, 'menu-on');
    } else {
      this.renderer.removeClass(myDivMenu, 'menu-on');
    }
  }


  //////////// FUNCIONES PRIVADAS  //////////////////////

}





