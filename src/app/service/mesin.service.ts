import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MesinService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getMesin() {
    return this.http.get(`${environment.ipServer}/edata-be/mesin/get-all-branches/${this.authService.cawangan}`);
  }

  getCurrentMesin(ibdID) {
    return this.http.get(`${environment.ipServer}/edata-be/mesin/get-current/${ibdID}`);
  }
}
