import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule} from "@angular/common/http";
import { BehaviorSubject, Observable, throwError} from 'rxjs';
import { catchError, retry, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base_path = "http://localhost:3031";

  private authenticated: BehaviorSubject<boolean>;
  public isAuth: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.authenticated = new BehaviorSubject<boolean>(false);
    this.isAuth = this.authenticated.asObservable();
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  currentStatus(): boolean {
    return this.authenticated.value;
  }

  authenticateUser(): any {

    let token = localStorage.getItem('token');
    let authenticated: any;

    if(token === null)
    {
      token = '';
    }

    const credentials = {
      token: token
    }

    console.log('Token: ' + token);

    return this.http.post< {authenticated: boolean} >(this.base_path + '/authenticate', JSON.stringify(credentials), this.httpOptions)
        .pipe(map(response => {
              this.authenticated.next(response.authenticated);
              console.log(response.authenticated);
              return authenticated;
            }
        ))
  }

  login(loginForm: string): any {

    /*
    if(this.authenticateUser())
    {
      console.log('User already logged in.');
      return
    }
    */
    return this.http.post<{success: boolean, token: string,  user: {id: string, username: string }}>(this.base_path + '/users/login', loginForm, this.httpOptions)
        .pipe(map(response => {
              localStorage.setItem('token', response.token);
              localStorage.setItem('username', response.user.username);
              this.authenticated.next(true);
              return this.isAuth;
            }
        ))
  }

  signup(account: string): any {
    /*
    if(this.authenticateUser())
    {
      console.log('User already logged in.');
      return
    }
    */
    this.http.post<{ msg: string }>(this.base_path + '/users/register', account, this.httpOptions)
        .subscribe({
          next: response => {
            alert(response.msg);
            window.location.reload();
          },
          error: err => {
            alert(err.message);
          }
        })
  }

}
