import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataProcess, MesinService } from 'src/app/service/mesin.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ibd',
  templateUrl: './ibd.page.html',
  styleUrls: ['./ibd.page.scss'],
  providers: [DatePipe]
})
export class IbdPage implements OnInit {
  processName : any = "Record Temperature";
  ibdNo : any = "Record Temperature";
  dateCapture : any = Date.now();
  ibdID: any;

  suhu: any = "";
  depan: any = "";
  tengah: any = "";
  belakang: any = "";

  processIbd : string [] = ["Intake Start", "Intake End", "Blower /CHF start", "Blower / CHF End", "Record Temperature", "Sack-Off Start", "Sack-End"]
  constructor(
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private mesinService: MesinService,
    private toastCtrl: ToastController,
    private router: Router,
    private navCtrl: NavController
    ) {
    this.dateCapture = this.datePipe.transform(this.dateCapture, 'dd-MM-yyyy hh:mm');

   }

  ngOnInit() {
    this.route.paramMap.subscribe( async params => {
      this.ibdID = params.get('ibdID');
      this.mesinService.getCurrentMesin(params.get('ibdID'))
      .subscribe(data => {
        this.processName = data["processName"];
        this.ibdNo = data["batchNo"];
      })
    });
  }

  SubmitForm() {

    let datas: DataProcess = {
      ibdId: this.ibdID,
      processName: this.processName,
      IBDNo: this.ibdNo,
      dateCapture: this.dateCapture,
      suhu: this.suhu,
      depan: this.depan,
      tengah: this.tengah,
      belakang: this.belakang
    };

    this.mesinService.sendInfoIbd(datas)
    .subscribe(data => {
      if(data["status"]== "OK"){
        this.mesinService.getAllLaporan();
        this.openToast("Succesfull saved.");
        this.router.navigateByUrl('/tabs/tab2');
      }else{
        this.openToast("Unsuccesfull saved.");
      }
    })
  }

  openToast(title){
    this.toastCtrl.create({
      header: title,
      color: "success",
      position: 'bottom',
      duration: 1000
  })
      .then(toastEl => {
          toastEl.present();
      });
  }

  ionViewDidLeave() {
    this.navCtrl.navigateRoot;
  }



}
