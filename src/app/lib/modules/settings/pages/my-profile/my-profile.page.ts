import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SessionService} from 'src/app/lib/core/services/session.service';
import {ThemeService} from 'src/app/lib/core/services/theme.service';
import {Consts} from 'src/app/lib/core/utils/consts.util';
import {
  ChangePasswordFormModalComponent
} from '../../components/modals/change-password-form-modal/change-password-form-modal.component';
import {
  MyProfileFormModalComponent
} from '../../components/modals/my-profile-form-modal/my-profile-form-modal.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  darkMode = false;

  constructor(
    private _themeService: ThemeService,
    public sessionService: SessionService,
    private _modalController: ModalController,
  ) {
  }

  ngOnInit() {
    this.darkMode = this._themeService.isDarkMode;
  }

  onToggleTheme(): void {
    if (this.darkMode === this._themeService.isDarkMode) {
      return;
    }
    this._themeService.isDarkMode = this.darkMode;
  }

  async onChangePassword(): Promise<void> {

    const formModal = await this._modalController.create({
      component: ChangePasswordFormModalComponent,
      breakpoints: Consts.BREAKPOINTS_MODAL_FULL,
      initialBreakpoint: Consts.INITIAL_BREAKPOINT_MODAL_THREE_QUARTER,
      backdropDismiss: false,
      componentProps: {
        username: this.sessionService.userSession.username,
      }
    });

    await formModal.present();

  }

  async onEditProfile(): Promise<void> {

    const formModal = await this._modalController.create({
      component: MyProfileFormModalComponent,
      breakpoints: Consts.BREAKPOINTS_MODAL_FULL,
      initialBreakpoint: Consts.INITIAL_BREAKPOINT_MODAL_THREE_QUARTER,
      backdropDismiss: false,
      componentProps: {
        userId: this.sessionService.userSession._id,
      }
    });

    await formModal.present();

    const { data } = await formModal.onWillDismiss();

    if (data) {
      this.sessionService.userSession = data;
    }

  }

}
