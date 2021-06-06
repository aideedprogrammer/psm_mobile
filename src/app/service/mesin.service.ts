import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

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
}
