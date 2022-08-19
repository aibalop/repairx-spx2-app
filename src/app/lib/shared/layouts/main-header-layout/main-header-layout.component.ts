import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserMenuPopoverComponent } from '../../components/user-menu-popover/user-menu-popover.component';

@Component({
  selector: 'app-main-header-layout',
  templateUrl: './main-header-layout.component.html',
  styleUrls: ['./main-header-layout.component.scss'],
})
export class MainHeaderLayoutComponent implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() { }

  async onOpenUserMenuPopover(e: Event): Promise<void> {
    const popover = await this.popoverController.create({
      component: UserMenuPopoverComponent,
      dismissOnSelect: true,
      showBackdrop: true,
      event: e,
    });

    await popover.present();
  }

}
