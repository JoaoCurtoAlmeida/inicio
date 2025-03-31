import { Component, Renderer2, OnInit, OnDestroy, ElementRef } from '@angular/core';

@Component({
  selector: 'app-projetos',
  imports: [],
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.css'
})

export class ProjetosComponent {
  private isInfoMode = false;

  constructor(private renderer: Renderer2, private el: ElementRef) { }


   Oninfo() {
    const myDivInfo = this.el.nativeElement.querySelector('.container-info');


    this.isInfoMode = !this.isInfoMode;
    if (this.isInfoMode) {
      this.renderer.addClass(myDivInfo, 'on-info');


    } else {

      this.renderer.removeClass(myDivInfo, 'on-info');


    }
  }

}
