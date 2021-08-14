import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

export interface Report {
  id: string,
  month: string,
  year: string,
  batchNo: string,
  processName: string,
  mesinId: string,
  nextProcessName: string
  mesinName: string,
}

export interface DataProcess {
  ibdId: string,
  processName: string,
  IBDNo: string,
  dateCapture: string,
  suhu: string,
  depan: string,
  tengah: string,
  belakang: string
}

@Injectable({
  providedIn: 'root'
})
export class MesinService {
  report = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }



  getMesin() {
    return this.http.get(`${environment.ipServer}/bernas/mesin/get-all-branches/${this.authService.cawangan}`);
  }

  getCurrentMesin(ibdID) {
    return this.http.get(`${environment.ipServer}/bernas/laporan/get_ibd/${ibdID}`);
  }

  getDetailsLaporan(laporanID) {
    return this.http.get(`${environment.ipServer}/bernas/laporan/get_details/${laporanID}`);
  }

  sendInfoIbd(datas : DataProcess) {
    let formData: any = new FormData();
    formData.append('processName', datas.processName);
    formData.append('IBDNo', datas.IBDNo);
    formData.append('dateCapture', datas.dateCapture);
    formData.append('suhu', datas.suhu);
    formData.append('depan', datas.depan);
    formData.append('tengah', datas.tengah);
    formData.append('belakang', datas.belakang);
    formData.append('ibdId', datas.ibdId);
    formData.append('cawangan', this.authService.cawangan);
    formData.append('staffId', this.authService.name + "(" + this.authService.staffId + ")" );


    return this.http.post(`${environment.ipServer}/bernas/laporan/add_lopran`, formData)
        .pipe(
            map( data => {
                return ({status: data['status']});
            })
        );
  }


  getReports(): Observable<Report[]> {
    return this.report.asObservable();
  }

  getAllLaporan() {
    let processList = ["Intake Start", "Intake End", "Blower /CHF start", "Blower / CHF End", "Record Temperature", "Sack-Off Start", "Sack-End"]

    return this.http.get<[]>(`${environment.ipServer}/bernas/laporan/mobile_alls/${this.authService.cawangan}`)
    .subscribe(response => {
      let reports: Report[] = [];
      for (let i = 0; i < response.length; i++) {
        let noIndex = processList.indexOf(response[i]['processName']);
        reports.push({
          id: response[i]['id'],
          month: response[i]['month'],
          year: response[i]['year'],
          batchNo: response[i]['batchNo'],
          processName: response[i]['processName'],
          mesinId: response[i]['mesinId'],
          nextProcessName: processList[noIndex + 1],
          mesinName: response[i]['mesinName'],
        })
      }
      console.log(reports);
      this.report.next(reports);
    })
  }
}
