import { Injector } from '@angular/core';
import { AXFWidgetService, WidgetConfig } from '../services/widget.service';
import { AXHtmlUtil, AXPopupService } from 'acorex-ui'
import { AXFWidgetEditorComponent } from '../shared/widget-editor/widget-editor.component';
import { AXFBoxStyleValue } from 'acorex-form-builder/lib/modules/property-editor/editors/style/box-style/box-style.class';

export const WidgetInjector: { instance?: Injector } = {};


export abstract class AXFWidget {
    uid: string;
    config: WidgetConfig;
    parent: AXFWidget;
    widgets: WidgetConfig[] = [];

    private widgetService: AXFWidgetService;


    constructor() {
        this.widgetService = WidgetInjector.instance.get(AXFWidgetService);

    }

    protected appendChild(name: string, options: any = {}) {
        let w = Object.assign({}, this.widgetService.resolve(name));
        w.options = options;
        w.options.uid = AXHtmlUtil.getUID();
        w.options.parent = this;
        this.widgets.push(w);
    }



    refresh() {

    }

    getJson() {

    }

    applyStyle(el: HTMLElement): void {

        // apply background color
        if (this["bgColor"]) {
            el.style.backgroundColor = this["bgColor"];
        }
        // apply text color
        if (this["color"]) {
            el.style.color = this["color"];
        }
        // apply padding
        if (this["boxStyle"]) {
            let boxStyle = this["boxStyle"] as AXFBoxStyleValue;
            el.style.paddingTop = `${boxStyle.padding.top}px`;
            el.style.paddingBottom = `${boxStyle.padding.bottom}px`;
            el.style.paddingLeft = `${boxStyle.padding.left}px`;
            el.style.paddingRight = `${boxStyle.padding.right}px`;
            // apply border size
            el.style.borderTop = `${boxStyle.border.top}px solid #000`;
            el.style.borderBottom = `${boxStyle.border.bottom}px solid #000`;
            el.style.borderLeft = `${boxStyle.border.left}px solid #000`;
            el.style.borderRight = `${boxStyle.border.right}px solid #000`;
            // apply margin size
            el.style.marginTop = `${boxStyle.margin.top}px`;
            el.style.marginBottom = `${boxStyle.margin.bottom}px`;
            el.style.marginLeft = `${boxStyle.margin.left}px`;
            el.style.marginRight = `${boxStyle.margin.right}px`;
        }
    }

}
export abstract class AXFWidgetDesigner extends AXFWidget {

    private popupService: AXPopupService;
    constructor() {
        super();
        this.popupService = WidgetInjector.instance.get(AXPopupService);
    }

    delete() {
        if (this.parent) {
            this.parent.widgets = this.parent.widgets.filter(c => c.options.uid != this.uid);
            this.parent.refresh();
        }
    }

    edit() {
        this.popupService.open(AXFWidgetEditorComponent, {
            title: this.config.title,
            size: "lg",
            data: {
                config: this.config
            }
        }).closed((c) => {

        })
    }
    copy() {

    }

  
}
export abstract class AXFWidgetView extends AXFWidget {
    constructor() {
        super();
    }

}
export abstract class AXFWidgetPrint extends AXFWidget {
    constructor() {
        super();
    }

}