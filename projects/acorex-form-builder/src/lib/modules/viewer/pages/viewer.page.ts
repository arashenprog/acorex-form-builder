import { Component, HostListener } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';
import { WidgetConfig, AXFWidgetService } from '../../widget/services/widget.service';
import { ActivatedRoute } from '@angular/router';
import { AXFConnectService } from '../../widget/services/connect.service';
import { AXFFormService } from '../../widget/services/form.service';

@Component({
  templateUrl: './viewer.page.html',
  styleUrls: ['./viewer.page.scss']
})
export class ACFViewerPage extends AXBasePageComponent {

  constructor(
    private widgetService: AXFWidgetService,
    private router: ActivatedRoute,
    private connectService: AXFConnectService,
    private formService: AXFFormService
  ) {
    super();
    this.mode = this.router.snapshot.queryParams.mode;

    formService.on("valueChange", (e) => {
      this.formData[e.name] = e.value;
    })

    formService.on("submit", (e) => {
      console.log("submit", this.formData);
    })
  }


  private formData: any = {};

  mode: string = "view";
  widgets: WidgetConfig[] = [];

  ngAfterViewInit() {
    this.connectService.send("load").then(data => {
      this.widgets = [this.widgetService.parse(data.widgets)];
    })
  }
}
