import { Component } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { Router,NavigationStart} from '@angular/router';
import { AuthService } from "./_service/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  static token = ""; 
  title = "myapp";
  authenticated: any;
  constructor(private auth: AuthService, private snackbar: MatSnackBar, private router: Router){
     this.authenticated = auth.isAuth;
  }

  Authenticated(){
    if ("" != AppComponent.token) {
      return true;
    }
    else {
      return false;
    }
  }
  logout() {
    AppComponent.token = "";
    this.snackbar.open("You've been successfully logged out!", "Okay");
    this.router.navigate(["/home"]);
  }
  
  
}
