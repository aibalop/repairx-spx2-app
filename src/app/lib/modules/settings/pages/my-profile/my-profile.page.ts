import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SessionService } from 'src/app/lib/core/services/session.service';
import { ThemeService } from 'src/app/lib/core/services/theme.service';
import { Consts } from 'src/app/lib/core/utils/consts.util';
import {
  ChangePasswordFormModalComponent
} from '../../components/modals/change-password-form-modal/change-password-form-modal.component';
import {
  MyProfileFormModalComponent
} from '../../components/modals/my-profile-form-modal/my-profile-form-modal.component';
import { CompanyApiService } from '../../../companies/api/company.api.service';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { ICompany } from '../../../companies/interfaces/company.interface';
import { FormatUtil } from 'src/app/lib/core/utils/format.util';
import { CompanyFormModalComponent } from '../../components/modals/company-form-modal/company-form-modal.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  darkMode = false;

  company: ICompany;
  companyPhone: string = '';
  companyAddress: string = '';

  constructor(
    private _themeService: ThemeService,
    public sessionService: SessionService,
    private _companyApiService: CompanyApiService,
    private _modalController: ModalController,
    private _alertDialogService: AlertDialogService,
  ) {
  }

  ngOnInit() {
    this.darkMode = this._themeService.isDarkMode;
    this._getCompany();
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
      this.sessionService.userSession.name = data.name;
      this.sessionService.userSession.lastName = data.lastName;
      this.sessionService.userSession.username = data.username;
      this.sessionService.userSession.email = data.email;
      this.sessionService.userSession = this.sessionService.userSession;
    }

  }

  async onEditCompany(): Promise<void> {

    const formModal = await this._modalController.create({
      component: CompanyFormModalComponent,
      breakpoints: Consts.BREAKPOINTS_MODAL_FULL,
      initialBreakpoint: Consts.INITIAL_BREAKPOINT_MODAL_THREE_QUARTER,
      backdropDismiss: false,
      componentProps: {
        companyId: this.company._id,
      }
    });

    await formModal.present();

    const { data } = await formModal.onWillDismiss();

    if (data) {
      this.sessionService.userSession.companyId.name = data.name;
      this.sessionService.userSession = this.sessionService.userSession;
      this.company = data;
      this.companyPhone = FormatUtil.getFormattedPhone(this.company.phone);
      this.companyAddress = FormatUtil.getFormattedAddress(this.company.address);
    }

  }

  async _getCompany(): Promise<void> {
    try {
      this.company = await this._companyApiService.getById(this.sessionService.userSession.companyId._id).toPromise();
      this.companyPhone = FormatUtil.getFormattedPhone(this.company.phone);
      this.companyAddress = FormatUtil.getFormattedAddress(this.company.address);
    } catch (error) {
      this._alertDialogService.catchError(error);
    }
  }

}
