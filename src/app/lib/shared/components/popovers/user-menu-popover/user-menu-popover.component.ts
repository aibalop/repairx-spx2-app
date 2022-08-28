import { Component } from '@angular/core';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { SessionService } from 'src/app/lib/core/services/session.service';

@Component({
  selector: 'app-user-menu-popover',
  templateUrl: './user-menu-popover.component.html',
  styleUrls: ['./user-menu-popover.component.scss'],
})
export class UserMenuPopoverComponent {

  constructor(
    private readonly sessionService: SessionService,
    private readonly alertDialogService: AlertDialogService
  ) { }

  async onLogout(): Promise<void> {
    const confirm = await this.alertDialogService.confirm('Confirmar', '¿Desea cerrar sesión?');

    if (confirm) {
      this.sessionService.logout();
    }
  }

}
