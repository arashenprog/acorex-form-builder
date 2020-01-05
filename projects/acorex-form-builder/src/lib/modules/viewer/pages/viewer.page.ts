import { Component, HostListener, ElementRef } from '@angular/core';
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

  mode: string = "view";
  widgets: WidgetConfig[] = [];

  constructor(
    private widgetService: AXFWidgetService,
    private router: ActivatedRoute,
    private connectService: AXFConnectService
  ) {
    super();
    this.mode = this.router.snapshot.queryParams.mode;
  }

  intervalId: number;




  ngAfterViewInit() {
    this.connectService.send("load").then(data => {
      this.widgets = [this.widgetService.parse(data.widgets)];
      this.intervalId = window.setInterval(() => {
        this.connectService.send("sync", { height: document.documentElement.scrollHeight }).then(data => {
        })
      }, 1000)
    })
  }

  ngOnDestroy() {
    window.clearInterval(this.intervalId);
  }
}
