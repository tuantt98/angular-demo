import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-page-error',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string;

  constructor(private route: ActivatedRoute){}

  ngOnInit() {
    // this.errorMessage = this.route.snapshot.data['message'];
    this.route.data.subscribe(
      (data: {message: string}) => {
        console.log("data: ", this.errorMessage);

        this.errorMessage = data.message;
        console.log("data2: ", this.errorMessage);
      }
    );
  }
}
