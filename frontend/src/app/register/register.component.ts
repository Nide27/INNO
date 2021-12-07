import { HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../_service/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService, private snackbar: MatSnackBar, private router: Router) {}

  registerForm = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    username: new FormControl(""),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    passwordRepeat: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  hide = true;
  isLoading = false;

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  ngOnInit(): void {}
  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.auth.signup(JSON.stringify(this.registerForm.value));
      this.snackbar.open(
          "You have successfully registered your account",
          "Okay"
      );
      this.router.navigate(["/login"]);
    }
  }
}