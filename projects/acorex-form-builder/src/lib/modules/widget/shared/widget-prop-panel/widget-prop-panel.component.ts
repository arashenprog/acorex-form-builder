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
                this.widget.config.properties.forEach(p => {
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
        return list.filter(c => c.visible != false && !hidden.includes(c.name));
    }

    handleValueChange(name: string, value: any) {
        this.widget.config.options[name] = value;
        this.eventService.broadcast("VALUE_CHANGE", {
            uid: this.widget.uid,
            name: name,
            value: value
        });
        this.cdr.markForCheck();
    }
}
