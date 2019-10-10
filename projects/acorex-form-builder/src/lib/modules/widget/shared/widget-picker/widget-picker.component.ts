import { Component, OnInit } from '@angular/core';
import { WidgetConfig, AXFWidgetService } from '../../services/widget.service';

@Component({
    templateUrl: './widget-picker.component.html',
    styleUrls: ['./widget-picker.component.scss']
})
export class AXFWidgetPickerComponent implements OnInit {

    list: WidgetConfig[];

    constructor(private widgetService: AXFWidgetService) {

        this.list = widgetService.getList();
    }

    ngOnInit(): void { }
}
