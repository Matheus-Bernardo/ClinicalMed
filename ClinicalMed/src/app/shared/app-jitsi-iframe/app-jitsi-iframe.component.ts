import {
  Component,
  Input,
  OnDestroy,
  AfterViewInit,
  ViewEncapsulation
} from '@angular/core';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-jitsi-iframe',
  standalone: true,
  template: `<div id="jitsi-container" style="height: 100vh; width: 100%;"></div>`,
  encapsulation: ViewEncapsulation.None // evita conflito de estilos
})
export class JitsiIframeComponent implements AfterViewInit, OnDestroy {
  @Input() meetingUrl!: string;

  private api: any;

  ngAfterViewInit(): void {
    if (!this.meetingUrl) return;

    const domain = 'meet.jit.si';
    const roomName = this.extractRoomName(this.meetingUrl);
    const container = document.querySelector('#jitsi-container');

    if (!container || !roomName) return;

    this.api = new JitsiMeetExternalAPI(domain, {
      roomName,
      parentNode: container,
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        DEFAULT_REMOTE_DISPLAY_NAME: 'Participante',
        SHOW_CHROME_EXTENSION_BANNER: false
      },
      configOverwrite: {
        disableDeepLinking: true
      }
    });
  }

  ngOnDestroy(): void {
    if (this.api) {
      this.api.dispose();
    }
  }

  private extractRoomName(url: string): string {
    try {
      const parts = new URL(url);
      return parts.pathname.split('/').pop() || 'defaultRoom';
    } catch {
      return 'defaultRoom';
    }
  }
}
