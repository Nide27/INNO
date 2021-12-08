import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AppComponent } from "../app.component";
import { AuthService } from "../_service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });

  hide = true;
  isLoading = false;
  constructor(
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.auth.login(JSON.stringify(this.loginForm.value)).subscribe({
        next: () => {
          this.snackbar.open("You have successfully logged in", "Okay");
          this.router.navigate(["/home"]);
        },
        error: () => {
          this.snackbar.open(
            "Your e-mail doesn't match with your password",
            "Okay"
          );
        },
      });
    }
  }
}
