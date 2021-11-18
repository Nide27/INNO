import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email : new FormControl('', [Validators.email, Validators.required]),
    pw : new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPw : new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  hide = true;
  isLoading = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  ngOnInit(): void {
  }
  onSubmit() : void {
   if (this.registerForm.valid){
     console.log(this.registerForm);
   }
  }

}
