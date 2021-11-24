import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  uploader: FileUploader = new FileUploader({
    url: "api/your_upload",
    removeAfterUpload: false,
    autoUpload: true,
  });
}
