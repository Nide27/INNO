import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule} from "@angular/common/http";
import { BehaviorSubject, Observable, throwError} from 'rxjs';
import { catchError, retry, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

    return this.http.post< {authenticated: boolean} >('http://localhost:3000/authenticate', JSON.stringify(credentials), this.httpOptions)
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
    return this.http.post<{ token: string, username: string, message: string }>('http://localhost:3000/login', loginForm, this.httpOptions)
        .pipe(map(response => {
              localStorage.setItem('token', response.token);
              localStorage.setItem('username', response.username);
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
    this.http.post<{ message: string }>('http://localhost:3000/signup', account, this.httpOptions)
        .subscribe({
          next: response => {
            alert(response.message);
            window.location.reload();
          },
          error: err => {
            alert(err.message);
          }
        })
  }

  getHighscores(): any {
    return this.http.get('http://localhost:3000/highscore');
  }

  addHighscore( username: string, points: number): any {
    const highscore = {
      username: username,
      points: points
    }

    this.http.post('http://localhost:3000/highscore', JSON.stringify(highscore), this.httpOptions)
        .subscribe({next: () => console.log('Highscore added')})
  }

  logout(): void {
    this.http.post('http://localhost:3000/logout', this.httpOptions)
        .subscribe({
          next: () => {
            localStorage.removeItem('token');
            this.authenticated.next(false);
          }
        })
  }
}
