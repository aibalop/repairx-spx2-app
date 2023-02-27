import { Component } from '@angular/core';
import { ESettingsRoutes } from 'src/app/lib/core/enums/modules-routes.enum';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { SessionService } from 'src/app/lib/core/services/session.service';
import { ThemeService } from 'src/app/lib/core/services/theme.service';

@Component({
  selector: 'app-user-menu-popover',
  templateUrl: './user-menu-popover.component.html',
  styleUrls: ['./user-menu-popover.component.scss'],
})
export class UserMenuPopoverComponent {

  settingsRoutes = ESettingsRoutes;

  constructor(
    private readonly _sessionService: SessionService,
    private readonly _alertDialogService: AlertDialogService,
    private readonly _themeService: ThemeService,
  ) {
  }

  async onLogout(): Promise<void> {
    const confirm = await this._alertDialogService.confirm('Confirmar', '¿Desea cerrar sesión?');

    if (confirm) {
      this._sessionService.logout();
      if (this._themeService.isDarkMode) {
        this._themeService.isDarkMode = false;
      }
    }
  }

}
