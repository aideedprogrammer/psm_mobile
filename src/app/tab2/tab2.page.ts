import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { MesinService } from '../service/mesin.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  ibdList: any = [{id: "SSS", ibdNo : "SSS"}];
  selectedIBD: any;
  constructor(
    private popCtrl : PopoverController,
    private router: Router,
    private mesinService: MesinService
  ) {}

  openIBD(IBDId) {
    this.router.navigateByUrl('/tabs/tab2/ibd/' + IBDId);
  }

  ngOnInit() {

  }

  ionViewWillEnter() {

    this.selectedIBD = null;
    this.mesinService.getAllLaporan();
    this.mesinService.getMesin()
    .subscribe(data => {
      this.ibdList = data["data"];
    })
  }

  onChange($event){
    this.openIBD($event);
    this.selectedIBD = "";
    }

}
