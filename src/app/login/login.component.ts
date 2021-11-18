import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AppComponent } from '../app.component';
import {AuthService} from "../_service/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    pw : new FormControl('', Validators.required),
  });

  hide = true;
  isLoading = false;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  
  onSubmit() : void {

    if (this.loginForm.valid) {
      this.auth.login(JSON.stringify(this.loginForm.value))
          .subscribe({
            next: () => {
              console.log('Logged in');
            },
            error: () => {
              alert('Username/password don\'t match');
            }
          })
    }
  }

}
