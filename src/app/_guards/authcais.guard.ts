import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardcais implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
         if ( JSON.parse(sessionStorage.getItem('currentUser')).accessLevel==3 ) {
             // logged in so return true
            return true;
         }

         sessionStorage.removeItem('currentUser') ;
         sessionStorage.clear();

         // not logged in so redirect to login page
         this.router.navigate(['']);
         return false;
    }
}
