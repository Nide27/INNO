import {Component, OnInit} from "@angular/core";
import {AuthService} from "../_service/auth.service";
import {AppComponent} from "../app.component";
import {ChartDataSets, ChartType} from 'chart.js';
import {Color, Label} from "ng2-charts";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})

export class HomeComponent implements OnInit {

    testArray = [];
    testArray2 = [];
    testArray3 = [];
    fileName = "";

    //angular.module('myModule', ['chart.js']);
    constructor(private auth: AuthService, private app: AppComponent) {
    }

    isLoading = false;

    ngOnInit(): void {
        if (localStorage.getItem("token") != null) {
            this.getData();
        }
    }

    isAuth = this.app.Authenticated();

    getData() {
        this.auth.getResponse().subscribe(
            res => {
                if (res != null) {
                    if (res.body?.data.length > 0) {
                        for (let i = 0; i < res.body?.data[0].data.length; i++) {
                            // @ts-ignore
                            this.testArray.push(res.body?.data[0].data[i]["1958"]);
                            // @ts-ignore
                            this.testArray2.push(res.body?.data[0].data[i]["1959"]);
                            // @ts-ignore
                            this.testArray3.push(res.body?.data[0].data[i]["1960"]);
                        }
                    }
                }
            }
        );
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        //this.auth.getData();
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
        {data: this.testArray, label: '1958'},
        {data: this.testArray2, label: '1959'},
        {data: this.testArray3, label: '1960'}
    ];


    lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    lineChartOptions = {
        responsive: true,
    };

    lineChartColors: Color[] = [
        {
            borderColor: '#161C58',
            backgroundColor: '#161C58',
        },
        {
            borderColor: '#6F15D9',
            backgroundColor: '#6F15D9',
        },
        {
            borderColor: '#C625DB',
            backgroundColor: '#C625DB',
        },
    ];

    lineChartLegend = true;
    lineChartPlugins = [];
    lineChartType: ChartType = 'line';

}
 



