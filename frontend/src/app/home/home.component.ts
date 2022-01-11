import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_service/auth.service";
import { AppComponent } from "../app.component";
import {ChartDataSets, ChartOptions, Chart, ChartType} from 'chart.js';
import {Color, Colors, Label} from "ng2-charts";



@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})

export class HomeComponent implements OnInit {


  //data[1].data.forEach(element => )
  testArray = [];
  testArray2 = [];
  testArray3 = [];
  fileName = "";
  //angular.module('myModule', ['chart.js']);
  constructor(private auth: AuthService, private app: AppComponent) {}

  isLoading = false;
  ngOnInit(): void {
    const data = this.getData();
    console.log(data);
  }

  isAuth = this.app.Authenticated();

  getData(){
    this.auth.getResponse().subscribe(
        res => {
          console.log(res.body?.data[1].data[1]["1958"]);
          for(let i = 0; i < res.body?.data[1].data.length; i++){
            // @ts-ignore
            this.testArray.push(res.body?.data[1].data[i]["1958"]);
            // @ts-ignore
            this.testArray2.push(res.body?.data[1].data[i]["1959"]);
            // @ts-ignore
            this.testArray3.push(res.body?.data[1].data[i]["1960"]);

          }
          res.body?.data[1].data.forEach((element: any) => {
            // this.testArray.push(element["1958"])
            // console.log(element.);
          })
        }
    );
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.auth.getData();
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
  lineChartData: ChartDataSets[] = [
    { data: this.testArray, label: '1958' },
    { data: this.testArray2, label: '1959' },
    { data: this.testArray3, label: '1960' },

  ];


  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
    },
    {
      borderColor: 'red',
    },
    {
      borderColor: 'green',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';
   
}
 



