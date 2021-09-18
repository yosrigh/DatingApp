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
           this.setCurrentUser(user);
          }
        })
      )
  }

  public logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User){
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  register(model: any){
    return  this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((Response : User) => {
        if (Response) {
          this.setCurrentUser(Response);
        }
      })
    )
  }

  getDecodedToken(token: string){
    return JSON.parse(atob(token.split('.')[1])); //1 is the index of payload
  }
}
