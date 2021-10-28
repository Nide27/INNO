import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  hide = true;
  isLoading = false;
  constructor() { }

  ngOnInit(): void {
  }
  
  onSubmit(email : any, pass : any ) : void {


  }

}
