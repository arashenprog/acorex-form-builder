import { Component, OnInit, Input, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Output, ViewEncapsulation, HostListener } from '@angular/core';
import { WidgetConfig, AXFWidgetProperty } from '../../services/widget.service';
import { AXFWidget, AXFWidgetDesigner } from '../../config/widget';
import { EventService } from 'acorex-ui';

@Component({
    selector: 'axf-widget-prop-panel',
    templateUrl: './widget-prop-panel.component.html',
    styleUrls: ['./widget-prop-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFWidgetPropPanelComponent {

    @HostListener('document:keyup', ['$event'])
    handleDeleteKeyboardEvent(event: KeyboardEvent) {

        if (event.key === 'Delete' && event.target == document.body) {
            if (this.widget)
                this.widget.delete();
        }
    }


    private tabs: any[] = [
        {
            name: "general",
            title: "General",
            order: 1,
            collapsed: false
        },
        {
            name: "style",
            title: "Style",
            order: 3,
            collapsed: false
        },
        {
            name: "data",
            title: "Data",
            order: 4,
            collapsed: false
        },
        {
            name: "print",
            title: "Print",
            order: 2,
            collapsed: false
        },
        {
            name: "binding",
            title: "Binding",
            order: 10,
            collapsed: false
        },
        {
            name: "behavior",
            title: "Behavior",
            order: 11,
            collapsed: false
        },

    ]

    tabNames: any[] = [];
    title: string;

    constructor(private cdr: ChangeDetectorRef, private eventService: EventService) {
        eventService.on("SELECT", c => {
            this.tabNames = [];
            this.widget = c;
            if (this.widget) {
                this.widget.config.properties.filter(c => c.visible != false).forEach(p => {
                    let tab = this.tabs.find(c => c.name.toLowerCase() == p.category.toLowerCase());
                    if (tab && !this.tabNames.some(c => c.name == tab.name)) {
                        this.tabNames.push(tab);
                    }
                });
                this.tabNames = this.tabNames.sort(this.sortByOrder);
                if (this.widget.config.name === 'outlet' && this.widget.config.options.widgetTitle) {
                    this.title = `${this.widget.config.title} (${this.widget.config.options.widgetTitle})`;
                } else {
                    this.title = this.widget.config.title;
                }

                this.cdr.markForCheck();
            }
        });
    }




    @Output()
    widgetChange: EventEmitter<AXFWidget> = new EventEmitter<AXFWidget>();

    widget: AXFWidgetDesigner;

    getProps(category: string): AXFWidgetProperty[] {

        let list = this.widget.config.properties.filter(c => c.category.toLowerCase() == category.toLowerCase());
        let hidden = [];
        list.forEach(p => {
            if (typeof p.visible === "function") {
                if (!p.visible(this.widget.config.options)) {
                    hidden.push(p.name);
                }
            }
        });
        return list.filter(c => c.visible != false && !hidden.includes(c.name)).sort(this.sortByOrder);
    }


    private sortByOrder(a, b) {
        return a.order == b.order ? 0 : (a.order > b.order ? 1 : -1);
    }

    handleDeleteClick() {
        this.widget.delete();
    }

    handleBindClick(p:AXFWidgetProperty)
    {
        // if(!this.widget.config.options['bindings'])
        //     this.widget.config.options['bindings']={};
        // this.widget.config.options['bindings'][p.name]="true";
    }

}
