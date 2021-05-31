import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService , Auth } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private unsubscribe: Subscription = new Subscription();
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toast: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    let auth: Auth = {
      email: form.value.email,
      password: form.value.password
    };

    this.loadingCtrl.create({keyboardClose: true, message: 'Logging in ...', spinner: 'circular'})
            .then(loadingEl => {
                loadingEl.present();
                this.unsubscribe.add(this.authService.loginAPI(auth)
                    .subscribe(async data => {
                        await loadingEl.dismiss();
                        if (data['status'] === 'OK') {
                          await this.router.navigateByUrl('/tabs/tab1');
                        } else {
                          this.onFailed();
                        }
                    })
                )
            })
  }

  onFailed() {
    this.toast.create({
        header: 'Wrong email or password.',
        position: 'bottom',
        duration: 1000
    })
        .then(toastEl => {
            toastEl.present();
        });
  }


}
