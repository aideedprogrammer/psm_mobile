import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MesinService } from 'src/app/service/mesin.service';

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

  processIbd : string [] = ["Intake Start", "Intake End", "Blower /CHF start", "Blower / CHF End", "Recode Temperature", "Sack-Off Start", "Sack-End"]
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
      console.log(params.get('ibdID'));
    });
  }



}
