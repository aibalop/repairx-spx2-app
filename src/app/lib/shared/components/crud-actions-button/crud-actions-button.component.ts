import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ECrudActions } from 'src/app/lib/core/enums/crud-actions.enum';
import { CrudActionsMenuPopoverComponent } from '../popovers/crud-actions-menu-popover/crud-actions-menu-popover.component';

@Component({
  selector: 'app-crud-actions-button',
  templateUrl: './crud-actions-button.component.html',
  styleUrls: ['./crud-actions-button.component.scss'],
})
export class CrudActionsButtonComponent implements OnInit {

  @Output() update: EventEmitter<void> = new EventEmitter();

  @Output() delete: EventEmitter<void> = new EventEmitter();

  constructor(private popoverController: PopoverController) { }

  ngOnInit() { }

  async onOpenCrudActionsMenu(e: Event): Promise<void> {
    const popover = await this.popoverController.create({
      component: CrudActionsMenuPopoverComponent,
      dismissOnSelect: true,
      showBackdrop: true,
      event: e,
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();

    if (!data) {
      return;
    }

    if (data === ECrudActions.UPDATE) {
      this.update.emit();
    }

    if (data === ECrudActions.DELETE) {
      this.delete.emit();
    }

  }

}
