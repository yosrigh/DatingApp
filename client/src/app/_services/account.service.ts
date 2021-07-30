import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1); // store  n variables here
  currentUser$  = this.currentUserSource.asObservable();
  constructor(private http : HttpClient) { }

  public login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model)
      .pipe(
        map((response : User) => {
          const user = response;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }
        })
      )
  }

  public logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  register(model: any){
    return  this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((Response : User) => {
        if (Response) {
          localStorage.setItem('user', JSON.stringify(Response));
          this.currentUserSource.next(Response);
        }
      })
    )
  }
}
