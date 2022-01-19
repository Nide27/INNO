import {Injectable} from "@angular/core";
import {
    HttpClient,
    HttpHeaders,
    HttpResponse
} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";


@Injectable({
    providedIn: "root",
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
        headers: new HttpHeaders({"Content-Type": "application/json"}),
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
                user: { id: string; username: string };
            }>
            (this.base_path + "/users/login", loginForm, this.httpOptions)
            .pipe(
                map((response) => {
                    let token = response.token;
                    localStorage.setItem('token', token);
                    localStorage.setItem("username", response.user.username);
                    this.authenticated.next(true);
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
                    //todo
                    console.log(response.msg);
                    this.authenticated.next(true);

                    console.log(this.isAuth);
                    return this.isAuth;
                }),
            );
    }

    fileUpload(file: FormData): any {
        this.http.post(this.base_path + "/data/upload", file)
            .subscribe(res => {
                console.log(res);

                alert('Uploaded Successfully.');
            })
    }

    getData(): any {
        return this.http
            .get<{
                status: boolean;
                message: string;
                data: any;
            }>(this.base_path + "/data/data")
            .subscribe(res => {
                if (res.data.length > 0){
                    return res.data;
                }
                return null;
            })
    }

    getData2(): Observable<HttpResponse<{
        status: boolean;
        message: string;
        data: any;
    }>> {
        return this.http.get<{
            status: boolean;
            message: string;
            data: any;
        }>(this.base_path + "/data/data", {observe: 'response'})
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
        }>(this.base_path + "/data/data", {observe: 'response'});
    }
}
