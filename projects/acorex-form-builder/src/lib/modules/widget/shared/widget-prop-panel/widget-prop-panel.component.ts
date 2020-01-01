import { Component, OnInit, Input, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Output, ViewEncapsulation } from '@angular/core';
import { WidgetConfig, AXFWidgetProperty } from '../../services/widget.service';
import { AXFWidget } from '../../config/widget';
import { EventService } from 'acorex-ui';

@Component({
    selector: 'axf-widget-prop-panel',
    templateUrl: './widget-prop-panel.component.html',
    styleUrls: ['./widget-prop-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFWidgetPropPanelComponent {

    constructor(private cdr: ChangeDetectorRef, private eventService: EventService) {
        eventService.on("SELECT", c => {
            this.tabNames = [];
            this.widget = c;
            if (this.widget) {
                this.widget.config.properties.filter(c => c.visible != false).forEach(p => {
                    if (!this.tabNames.includes(p.category)) {
                        this.tabNames.push(p.category);
                    }
                });
                this.cdr.markForCheck();
            }
        });
    }

    tabNames: string[] = [];


    @Output()
    widgetChange: EventEmitter<AXFWidget> = new EventEmitter<AXFWidget>();

    widget: AXFWidget;

    getProps(category: string): AXFWidgetProperty[] {

        let list = this.widget.config.properties.filter(c => c.category == category);
        let hidden = [];
        list.forEach(p => {
            if (typeof p.visible === "function") {
                if (!p.visible(this.widget.config.options)) {
                    hidden.push(p.name);
                }
            }
        });
        return list.filter(c => c.visible != false && !hidden.includes(c.name)).sort(c => c.order);
    }
}
