import { Injectable } from "@angular/core";
import {
    HttpClient,
    HttpHeaders,
    HttpClientModule, HttpResponse,
} from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, retry, map } from "rxjs/operators";
import { AppComponent } from "../app.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { RegisterComponent } from "../register/register.component";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    base_path = "http://localhost:3031";

    private authenticated: BehaviorSubject<boolean>;
    public isAuth: Observable<boolean>;

    constructor(private http: HttpClient, private snackbar: MatSnackBar, private router: Router) {
        this.authenticated = new BehaviorSubject<boolean>(false);
        this.isAuth = this.authenticated.asObservable();
    }

    httpOptions = {
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };

    currentStatus(): boolean {
        return this.authenticated.value;
    }

    authenticateUser(): any {
        let token = localStorage.getItem("token");
        let authenticated: any;

        if (token === null) {
            token = "";
        }

        const credentials = {
            token: token,
        };

        console.log("Token: " + token);

        return this.http
            .post<{ authenticated: boolean }>(
                this.base_path + "/authenticate",
                JSON.stringify(credentials),
                this.httpOptions
            )
            .pipe(
                map((response) => {
                    this.authenticated.next(response.authenticated);
                    console.log(response.authenticated);
                    return authenticated;
                })
            );
    }

    login(loginForm: string): any {
        return this.http
            .post<{
                success: boolean;
                token: string;
                user: { id: string; username: string };}>
            (this.base_path + "/users/login", loginForm, this.httpOptions)
            .pipe(
                map((response) => {
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("username", response.user.username);
                    this.authenticated.next(true);
                    AppComponent.token = response.token;
                    console.log(response.token);
                    return this.isAuth;
                })
            );
    }

    signup(account: string): any {
        return this.http
            .post<{ msg: string }>(
                this.base_path + "/users/register", account, this.httpOptions)
            .pipe(
                map((response) => {
                    //alert(response.msg);
                    console.log("test");
                    this.authenticated.next(true);

                    console.log(this.isAuth);
                    return this.isAuth;
                }),
            );
    }

    fileUpload(file: FormData): any{
        this.http.post(this.base_path + "/upload/data", file)
        .subscribe(res => {
          console.log(res);
          
          alert('Uploaded Successfully.');
        })
    }

    getData(): any{
        return this.http
            .get<{
            status: boolean;
            message: string;
            data: any;
            }>(this.base_path + "/data/data", this.httpOptions)
            .subscribe(res => {
                console.log(res.data[1].data[0]);
                return res.data;
            })
    }

    getResponse(): Observable<HttpResponse<{
        status: boolean;
        message: string;
        data: any;
    }>> {
        return this.http.get<{
            status: boolean;
            message: string;
            data: any;
        }>(
            this.base_path + "/data/data", { observe: 'response' });
    }
}