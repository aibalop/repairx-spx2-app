import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ECrudActions } from 'src/app/lib/core/enums/crud-actions.enum';

@Component({
  selector: 'app-crud-actions-menu-popover',
  templateUrl: './crud-actions-menu-popover.component.html',
  styleUrls: ['./crud-actions-menu-popover.component.scss'],
})
export class CrudActionsMenuPopoverComponent {

  @Input() showDelete: boolean = true;

  constructor(private popoverController: PopoverController) { }

  onView(): void {
    this.popoverController.dismiss(ECrudActions.READ);
  }
  
  onUpdate(): void {
    this.popoverController.dismiss(ECrudActions.UPDATE);
  }

  onDelete(): void {
    this.popoverController.dismiss(ECrudActions.DELETE);
  }

}
