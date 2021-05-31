import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {delay, map} from 'rxjs/operators';

export interface Auth {
  email: string,
  password: string
}

export interface Profile {
  staffId: string,
  name: string,
  phone: string,
  jawatan: string,
  cawangan: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userFlagAuth = true;

  public staffId = "";
  public name ="";
  public phone = "";
  public jawatan = "";
  public cawangan = "Pekan, Pahang";

  constructor(
    private http: HttpClient,
  ) { }

  get userIsAuthenticated() {

    return this. _userFlagAuth;
  }

  loginAPI(login: Auth) {

    let formData: any = new FormData();
    formData.append('email', login.email);
    formData.append('password', login.password);

    return this.http.post(`${environment.ipServer}/bernas/user/login_mobile`, formData)
        .pipe(
            map( data => {
              if(data['status'] == "OK"){
                this._userFlagAuth = true;
                this.staffId =  data['staffId'];
                this.name =  data['name'];
                this.phone =  data['phone'];
                this.jawatan =  data['jawatan'];
                this.cawangan =  data['cawangan'];
              }
                return ({status: data['status']});
            })
        );
  }

  logout() {
    this._userFlagAuth = false;
  }
}
