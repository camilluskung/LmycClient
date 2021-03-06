import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Headers, RequestOptions } from '@angular/http';
import { environment } from "environments/environment";
import 'rxjs/add/operator/map'

@Injectable()
export class AccountService {

  private url: string;
  private token: string;
  private authenticated: boolean;

  constructor(private client: HttpClient) {
    /* Set Account Api hook */
    this.url = environment.localUrl + "Account/";
  }

  public getHttpHeaderOptions(): any {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      })
    };
  }

  public isAuthenticated() {
    return this.authenticated;
  }

  public authenticate(username: string, password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      var Input: any = {
        Username: username,
        Password: password
      }
      
      this.client.post(this.url, Input)
        .toPromise()
        .then((r: string) => { //r: token
          if (r.length == 0)
            return reject("Incorrect User Name and/or Password.");

          this.authenticated = true;
          this.token = r;
      
          resolve(r);

      }).catch(r => {
        reject(r);
        });
        
    });
  }
}
