import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import '@splinetool/viewer';





document.addEventListener("DOMContentLoaded", () => {
  const splineViewer = document.querySelector('spline-viewer') as HTMLElement;

  if (splineViewer && splineViewer.shadowRoot) {
      const logo = splineViewer.shadowRoot.querySelector('#logo');
      if (logo) {
          logo.remove();
          console.log("Logo removido com sucesso!");
      } else {
          console.log("Logo não encontrado.");
      }
  } else {
      console.log("Elemento 'spline-viewer' não encontrado ou não possui Shadow DOM.");
  }
});




@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InicioComponent {
 
  
}
