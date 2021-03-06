import { Component, OnInit } from "@angular/core";
import { AXBasePageComponent, PromisResult, AXHttpService } from "acorex-ui";

@Component({
  selector: "builder-dashboard",
  templateUrl: "./builder.page.html",
  styleUrls: ["./builder.page.scss"]
})
export class BuilderPage extends AXBasePageComponent {
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
