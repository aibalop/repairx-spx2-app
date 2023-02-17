import { Component } from '@angular/core';
import { SessionService } from './lib/core/services/session.service';
import { SocketioService } from './lib/core/services/socketio.service';
import { ThemeService } from './lib/core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private sessionService: SessionService,
    private socketioService: SocketioService,
    private _themeService: ThemeService,
  ) {
    this.init();
  }

  private async init(): Promise<void> {
    await this._themeService.checkTheme();
    await this.sessionService.checkSession();

    if (this.sessionService.isLogged) {
      // TODO: uncomment when need it
      // this.socketioService.connect();
    }
  }
}
