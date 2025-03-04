import { Component, Renderer2, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


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

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    // Obtém o elemento assim que o componente for inicializado
    this.menu = document.querySelector('#containerId');

    // Adiciona o listener de scroll
    window.addEventListener('scroll', this.activeScroll);
  }

  ngOnDestroy(): void {
    // Remove o listener de scroll quando o componente for destruído
    window.removeEventListener('scroll', this.activeScroll);
  }

  // Método para adicionar/remover a classe 'blur' no scroll

  private activeScroll = () => {
   
    const myDivContainer = this.el.nativeElement.querySelector('.container');
    
    if (this.menu) {
      this.menu.classList.toggle('off-scroll', window.scrollY > 0);
      this.menu.classList.toggle('on-scroll', window.scrollY > 0);
     
      
      
      
    }

  }



  menuMode() {
    const myDivMenu = this.el.nativeElement.querySelector('.container-mobile');
    const myDivcloseMenu = this.el.nativeElement.querySelector('.container-mobile');
    this.isOpenMode = !this.isOpenMode;

    if (this.isOpenMode) {
      this.renderer.removeClass(myDivMenu, 'menu-off');
      this.renderer.addClass(myDivMenu, 'menu-on');
    } else {
      this.renderer.removeClass(myDivMenu, 'menu-on');
    }
  }

  toggleMode() {
    const myDivDark1 = this.el.nativeElement.querySelector('.container-toggle');
    const myDivDark2 = this.el.nativeElement.querySelector('.toggle');
    const myDivDark2Mobile = this.el.nativeElement.querySelector('.toggle-mobile');

    const myDivLight1 = this.el.nativeElement.querySelector('.container-toggle');
    const myDivLight2 = this.el.nativeElement.querySelector('.toggle');
    const myDivLight2Mobile = this.el.nativeElement.querySelector('.toggle-mobile');


    const myDivtoggleOn1 = this.el.nativeElement.querySelector('.info-mode1');
    const myDivtoggleOn2 = this.el.nativeElement.querySelector('.info-mode2');
    const myDivtoggleOn1Mobile = this.el.nativeElement.querySelector('.info-mode1-mobile');
    const myDivtoggleOn2Mobile = this.el.nativeElement.querySelector('.info-mode2-mobile');

    const myDivMenuColorLight = this.el.nativeElement.querySelector('.container-mobile');
    const myDivMenuColorDark = this.el.nativeElement.querySelector('.container-mobile');





    this.isDarkMode = !this.isDarkMode;


    if (this.isDarkMode) {
      this.renderer.addClass(myDivLight1, 'light-mode-container');
      this.renderer.addClass(myDivLight2, 'light-mode-toggle');
      this.renderer.addClass(myDivLight2Mobile, 'light-mode-toggle');


      this.renderer.removeClass(myDivtoggleOn1, 'info-on');
      this.renderer.addClass(myDivtoggleOn2, 'info-on');
      this.renderer.removeClass(myDivtoggleOn1Mobile, 'info-on');
      this.renderer.addClass(myDivtoggleOn2Mobile, 'info-on');

      this.renderer.addClass(myDivMenuColorLight, 'menu-light');
      this.renderer.removeClass(myDivMenuColorDark, 'menu-dark');


      this.renderer.removeClass(myDivDark1, 'dark-mode-container');
      this.renderer.removeClass(myDivDark2, 'dark-mode-toggle');

      this.renderer.removeClass(myDivDark2Mobile, 'dark-mode-toggle');

      this.renderer.addClass(document.body, 'light-mode');
      this.renderer.removeClass(document.body, 'dark-mode');
    } else {
      this.renderer.addClass(myDivtoggleOn1, 'info-on');
      this.renderer.removeClass(myDivtoggleOn2, 'info-on');
      this.renderer.addClass(myDivtoggleOn1Mobile, 'info-on');
      this.renderer.removeClass(myDivtoggleOn2Mobile, 'info-on');

      this.renderer.addClass(myDivMenuColorDark, 'menu-dark');
      this.renderer.removeClass(myDivMenuColorLight, 'menu-light');


      this.renderer.addClass(document.body, 'dark-mode');

      this.renderer.addClass(myDivDark1, 'dark-mode-container');
      this.renderer.addClass(myDivDark2, 'dark-mode-toggle');

      this.renderer.addClass(myDivDark2Mobile, 'dark-mode-toggle');



    }
  }





}
