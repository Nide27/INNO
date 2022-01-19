import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from "./_service/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {

  title = "myapp";
  authenticated: any;
  constructor(private auth: AuthService, private snackbar: MatSnackBar, private router: Router){
    this.authenticated = auth.isAuth;

  }

  Authenticated(){
    return null != localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
    this.snackbar.open("You've been successfully logged out!", "Okay");
    this.router.navigate(["/home"]);
    location.reload();
  }

}