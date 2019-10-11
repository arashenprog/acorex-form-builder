import { Component, OnInit } from '@angular/core';
import { WidgetConfig, AXFWidgetService } from '../../services/widget.service';
import { AXBasePageComponent } from 'acorex-ui';

@Component({
    templateUrl: './widget-picker.component.html',
    styleUrls: ['./widget-picker.component.scss']
})
export class AXFWidgetPickerComponent extends AXBasePageComponent {

    list: WidgetConfig[];
    categories: string[] = [];

    constructor(private widgetService: AXFWidgetService) {
        super();
        this.list = widgetService.getList();
        this.list.forEach(c => {
            if (!this.categories.includes(c.category)) {
                this.categories.push(c.category);
            }
        });
    }

    selectWidget(widget: WidgetConfig) {
        this.close(widget);
    }

    getList(cat: string):WidgetConfig[] {
        return this.list.filter(c => c.category == cat);
    }


}
