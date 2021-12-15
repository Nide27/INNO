import { Component, OnInit } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../_service/auth.service";
import { AppComponent } from "../app.component";
import { applySourceSpanToExpressionIfNeeded } from "@angular/compiler/src/output/output_ast";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  fileName = "";
  angular.module('myModule', ['chart.js']);
  constructor(private auth: AuthService, private app: AppComponent) {}

  isLoading = false;
  ngOnInit(): void {}

  isAuth = this.app.Authenticated();

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.isLoading = true;
      this.fileName = file.name;

      const formData = new FormData();

      formData.append("data", file);
      let uName = localStorage.getItem("username");
      formData.append("username", uName!);

       this.auth.fileUpload(formData);
      this.isLoading = false;


    }
  }

  uploader: FileUploader = new FileUploader({
    url: "api/your_upload",
    removeAfterUpload: false,
    autoUpload: true,
  });
 
}
