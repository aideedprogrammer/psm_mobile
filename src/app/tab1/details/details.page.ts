import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MesinService } from 'src/app/service/mesin.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  laporanID: any;
  nextProcess: any;
  nextProcessTime: any;
  detailLaporan: any;
  detailProcess: any;

  constructor(
    private route: ActivatedRoute,
    private mesinService: MesinService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( async params => {
      this.laporanID = params.get('laporanID');
      this.mesinService.getDetailsLaporan(params.get('laporanID'))
      .subscribe(data => {
        this.detailLaporan = data['data'];
        this.detailProcess = data['data1'];

        let lastProcess = data['data1'][data['data1'].length - 1]

        this.nextProcess = this.checkLastProcess(lastProcess['processName']);
        let date = lastProcess['date_captured'].substring(0,11);
        let time = lastProcess['date_captured'].substring(11,16);
        let hours = parseInt(time.substring(0,2)) + this.checklastTime(this.nextProcess);
        let minute = time.substring(3,5);
        this.nextProcessTime = date + " " + ((hours.toString().length == 1) ? "0"+hours : hours) + ":" + minute
      })
    });
  }

  checklastTime(processName){
    if(processName == "Intake End")
      return 4;
    else if(processName == "Blower /CHF start")
      return 0;
    else if(processName == "Blower / CHF End")
      return 4;
    else if(processName == "Record Temperature")
      return 8;
    else if(processName == "Sack-Off Start")
      return 1;
    else if(processName == "Sack-End")
      return 0;
  }

  checkLastProcess(processname){
    let processName  = ["Intake Start", "Intake End", "Blower /CHF start", "Blower / CHF End", "Record Temperature", "Sack-Off Start", "Sack-End"];
    let indexNo = processName.indexOf(processname);
    return processName[indexNo+1]

  }

}
