import { Injectable }    from '@angular/core';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


import { UserPdv } from '../models/userPdv';
import { UserPdvList } from '../mocks/mock-userPdv';


@Injectable()
export class UserPdvService {

  private userPdvUrl = 'http://assaneoka.alwaysdata.net/web/oka/ws';

  constructor(private http: Http) { }
  getHeroes(): Promise<UserPdv[]> {
    return this.http.get(this.userPdvUrl)
               .toPromise()
               .then(response => response.json() as UserPdv[])
               .catch(this.handleError);
  }
  // getHeroes(): Promise<UserPdv[]> {
  //   return this.http.get(this.userPdvUrl)
  //              .toPromise()
  //              .then(response => response.json())
  //              .catch(this.handleError);
  // }
  // getHeroes(): Promise<UserPdv[]> {
  //   return this.http.get(this.userPdvUrl)
  //              .toPromise()
  //              .then(response => response.json().data as UserPdv[])
  //              .catch(this.handleError);
  // }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getUserPdvList(): Promise<UserPdv[]> {
    return Promise.resolve(UserPdvList);
  }
  
  getUserPdvListSlowly(): Promise<UserPdv[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getUserPdvList()), 2000);
    });
  }
 

  getUserPdv(id: number): UserPdv {
    return UserPdvList.find(userPdv => userPdv.id === id);
  }
  
  
 // getUserPdv(id: number): Promise<UserPdv> {
 //    return this.getUserPdvList().then(userPdvList => userPdvList.find(userPdv => userPdv.id === id));
 //  }

}
