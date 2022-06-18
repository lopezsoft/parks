import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser        = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    if(environment.production) {
      const jwt = JSON.parse(localStorage.getItem(environment.apiJWT));
      return {
        id: jwt.user.id,
        email: jwt.user.email,
        password: "",
        role: Role.Admin,
        avatar: jwt.user.avatar,
        firstName: jwt.user.first_name,
        lastName: jwt.user.last_name
      };
    }else {
      return {
        id: 1,
        email: "lopez@lopez.com",
        password: "",
        role: Role.Admin,
        avatar: "storage/avatars/unknown.png",
        firstName: "LEWIS",
        lastName: "LOPEZ"
      };
    }
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return true;
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return false;
  }

  get token(): string {
    if(environment.production) {
      const jwt = JSON.parse(localStorage.getItem(environment.apiJWT));
      return jwt.access_token;
    }else {
      return environment.tempToken;
    }
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(email: string, password: string) {
    return this._http
      .post<any>(`${environment.apiUrl}/users/authenticate`, { email, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Display welcome toast!
            setTimeout(() => {
              this._toastrService.success(
                'You have successfully logged in as an ' +
                  user.role +
                  ' user to Vuexy. Now you can start to explore. Enjoy! 🎉',
                '👋 Welcome, ' + user.firstName + '!',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
            }, 2500);

            // notify
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  /**
   * User logout
   *
   */
  logout() {
    this.currentUserSubject.next(null);
    window.location.reload();
  }
}
