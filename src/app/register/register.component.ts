import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  isLoading = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  ngOnInit(): void {
  }

  //new stuff
  emailFormControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  confirmPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  onSubmit(email : any, pass : any ) : void {
   
  }

}
