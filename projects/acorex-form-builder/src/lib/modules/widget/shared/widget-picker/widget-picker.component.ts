import { Component, OnInit } from '@angular/core';
import { WidgetConfig, AXFWidgetService } from '../../services/widget.service';
import { AXBasePageComponent } from 'acorex-ui';

@Component({
    templateUrl: './widget-picker.component.html',
    styleUrls: ['./widget-picker.component.scss']
})
export class AXFWidgetPickerComponent extends AXBasePageComponent  {

    list: WidgetConfig[];

    constructor(private widgetService: AXFWidgetService) {
        super();
        this.list = widgetService.getList();
    }

    selectWidget(widget:WidgetConfig)
    {
        this.close(widget);
    }

  
}
