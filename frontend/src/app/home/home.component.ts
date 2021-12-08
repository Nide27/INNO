import { Component, OnInit } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../_service/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  fileName = "";
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append("data", file);
      let uName = localStorage.getItem("username");
      formData.append("username", uName!);

      const upload$ = this.auth.fileUpload(formData);

      upload$.subscribe();
    }
  }

  uploader: FileUploader = new FileUploader({
    url: "api/your_upload",
    removeAfterUpload: false,
    autoUpload: true,
  });
}
