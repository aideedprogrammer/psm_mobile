import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DataProcess, MesinService } from 'src/app/service/mesin.service';

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

  processIbd : string [] = ["Intake Start", "Intake End", "Blower /CHF start", "Blower / CHF End", "Record Temperature", "Sack-Off Start", "Sack-End"]
  constructor(
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private mesinService: MesinService
    ) {
    this.dateCapture = this.datePipe.transform(this.dateCapture, 'dd-MM-yyyy hh:mm');

   }

  ngOnInit() {
    this.route.paramMap.subscribe( async params => {
      this.mesinService.getCurrentMesin(params.get('ibdID'))
      .subscribe(data => {
        this.processName = data["processName"];
        this.ibdNo = data["batchNo"];
      })
      console.log(params.get('ibdID'));
    });
  }

  SubmitForm() {
    console.log("SDSSS")
    let datas: DataProcess = {
      ibdId: "string",
      processName: "string",
      IBDNo: "string",
      dateCapture: "string",
      suhu: "string",
      depan: "string",
      tengah: "string",
      belakang: "string"
    };

    this.mesinService.sendInfoIbd(datas)
    .subscribe(data => {})
  }



}
