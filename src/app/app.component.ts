import { Component } from '@angular/core';
import { Page1Component } from "./page1/page1.component";
import { InicioComponent } from './inicio/inicio.component';
import { Page2Component } from "./page2/page2.component";
import { ProjetosComponent } from './projetos/projetos.component';
@Component({
  selector: 'app-root',
  imports: [Page1Component, InicioComponent, Page2Component, ProjetosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inicio';

}
