import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
         if ( JSON.parse(sessionStorage.getItem('currentUser')).accessLevel==1 ) {
            return true;
         }
         sessionStorage.removeItem('currentUser') ;
         sessionStorage.clear();

         this.router.navigate(['']);
         return false;
    }
}
