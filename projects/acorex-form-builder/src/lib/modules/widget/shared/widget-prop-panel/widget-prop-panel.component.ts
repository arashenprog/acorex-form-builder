import { Component, OnInit, Input, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Output, ViewEncapsulation } from '@angular/core';
import { WidgetConfig, AXFWidgetProperty } from '../../services/widget.service';
import { AXFWidget } from '../../config/widget';
import { EventService } from 'acorex-ui';

@Component({
    selector: 'axf-widget-prop-panel',
    templateUrl: './widget-prop-panel.component.html',
    styleUrls: ['./widget-prop-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AXFWidgetPropPanelComponent {

    constructor(private cdr: ChangeDetectorRef, private eventService: EventService) {
        eventService.on("SELECT", c => {
            this.tabNames = [];
            this.widget = c;
            if (this.widget) {
                this.widget.config.properties.forEach(p => {
                    if (!this.tabNames.includes(p.category)) {
                        this.tabNames.push(p.category);
                    }
                });
            }
        });
    }

    tabNames: string[] = [];


    @Output()
    widgetChange: EventEmitter<AXFWidget> = new EventEmitter<AXFWidget>();

    widget: AXFWidget;

    getProps(category: string): AXFWidgetProperty[] {
        return this.widget.config.properties.filter(c => c.category == category);
    }

    handleValueChange(name: string, value: any) {
        this.widget.config.options[name] = value;
        this.eventService.broadcast("VALUE_CHANGE", {
            uid: this.widget.uid,
            name: name,
            value: value
        });
    }
}
