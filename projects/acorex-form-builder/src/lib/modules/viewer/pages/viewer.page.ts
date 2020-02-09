import { Component, HostListener, ElementRef, ViewEncapsulation } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';
import { WidgetConfig, AXFWidgetService } from '../../widget/services/widget.service';
import { ActivatedRoute } from '@angular/router';
import { AXFConnectService } from '../../widget/services/connect.service';

@Component({
  templateUrl: './viewer.page.html',
  styleUrls: ['./viewer.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ACFViewerPage extends AXBasePageComponent {

  mode: string = 'view';
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
      // this.intervalId = window.setInterval(() => {
      //   this.connectService.send("sync", { height: document.documentElement.offsetHeight }).then(data => {
      //   })
      // }, 300)
    });
  }

  ngOnDestroy() {
    window.clearInterval(this.intervalId);
  }
}
