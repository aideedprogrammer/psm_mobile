import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  name: any = "";
  staffId: any = "";
  phone: any = "";
  jawatan: any = "";
  cawangan: any = "";

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ionViewWillEnter() {
    this.name = this.authService.name;
    this.staffId = this.authService.staffId;
    this.phone = this.authService.phone;
    this.jawatan = this.authService.jawatan;
    this.cawangan = this.authService.cawangan;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);

  }

}
