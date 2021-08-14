import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesinService, Report } from '../service/mesin.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  reports: Report[] = [];
  constructor(
    private router: Router,
    private mesinService: MesinService
  ) {}

    ngOnInit() {
      this.mesinService.getAllLaporan();
    }

  ionViewWillEnter() {
    this.mesinService.getReports()
    .subscribe(response => {
      this.reports = response
    })
  }

  openModal(laporanID) {
    this.router.navigateByUrl('/tabs/tab1/details/' + laporanID);
  }

}
