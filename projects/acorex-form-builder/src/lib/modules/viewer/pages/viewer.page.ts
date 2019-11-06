import { Component, HostListener } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';
import { WidgetConfig, AXFWidgetService } from '../../widget/services/widget.service';

@Component({
  templateUrl: './viewer.page.html',
  styleUrls: ['./viewer.page.scss']
})
export class ACFViewerPage extends AXBasePageComponent {

  constructor(private widgetService: AXFWidgetService) { super(); }



  widgets: WidgetConfig[] = [];

  @HostListener('window:message', ['$event'])
  handleMessage(e) {
    if (e.data && e.data.action == "load") {
      this.widgets = this.widgetService.parse(e.data.data.widgets);
    }
  }

  ngAfterViewInit() {
    window.parent.postMessage({
      action: 'load'
    }, '*');
  }
}
