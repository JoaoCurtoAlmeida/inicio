import { Component } from '@angular/core';
import { Page1Component } from "./page1/page1.component";
import { InicioComponent } from './inicio/inicio.component';
import { Page2Component } from "./page2/page2.component";
@Component({
  selector: 'app-root',
  imports: [Page1Component, InicioComponent, Page2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inicio';

}
