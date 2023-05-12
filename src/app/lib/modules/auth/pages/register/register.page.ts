import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/lib/core/services/alert-dialog.service';
import { SessionService } from 'src/app/lib/core/services/session.service';
import { SocketioService } from 'src/app/lib/core/services/socketio.service';
import { ToastService } from 'src/app/lib/core/services/toast.service';
import { AuthApiService } from '../../api/auth.api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form = new FormGroup({
    user: new FormGroup({
      name: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    }),
    company: new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      address: new FormGroup({
        street: new FormControl(null),
        num: new FormControl(null),
        interiorNum: new FormControl(null),
        colony: new FormControl(null),
        zip: new FormControl(null),
        location: new FormControl(null),
        city: new FormControl(null),
        state: new FormControl(null),
        country: new FormControl(null)
      }),
    }),
  });

  isSend = false;

  constructor(
    private readonly toastService: ToastService,
    private readonly alertDialogService: AlertDialogService,
    private readonly authApiService: AuthApiService,
    private readonly sessionService: SessionService,
    private readonly socketioService: SocketioService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this._signIn();
  }

  private async _signIn(): Promise<void> {
    try {
      this.isSend = true;
      // const { username, password } = this.form.value;
      // const signInSuccess = await this.authApiService.signIn(username, password).toPromise();
      // this.toastService.success(signInSuccess.message);
      // this.sessionService.token = signInSuccess.token;
      // this.sessionService.userSession = signInSuccess.user;
      // this.form.reset();
      this.isSend = false;
      // this.socketioService.connect(); // TODO: uncomment when we need it!
      this.router.navigateByUrl('/')
    } catch (error) {
      this.isSend = false;
      this.alertDialogService.catchError(error);
    }
  }

}
