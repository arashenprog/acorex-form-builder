import { Component, OnInit } from "@angular/core";
import { AXBasePageComponent, PromisResult, AXHttpService } from "acorex-ui";

@Component({
  selector: "starter-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class StarterDashboardPage extends AXBasePageComponent {
  constructor(private http: AXHttpService) {
    super();
  }
  provideGridData = () => {
    return new PromisResult(resolve => {
      this.http
        .get("https://jsonplaceholder.typicode.com/todos", {})
        .result(c => {
          resolve(c);
        });
    });
  };
  ngOnInit(): void { }
}
