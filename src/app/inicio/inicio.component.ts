import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html', // Mantendo o HTML separado
  styleUrls: ['./inicio.component.css']   // Corrigindo a propriedade
})
export class InicioComponent implements AfterViewInit {
  
  @ViewChild('videoElement') video!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    if (this.video) {
      const video = this.video.nativeElement;
      video.muted = true;
      video.play().catch(error => console.error('Erro ao iniciar o vídeo:', error));
    }
  }

}
