import { Injector, EventEmitter } from '@angular/core';
import { AXFWidgetService, WidgetConfig } from '../services/widget.service';
import { AXHtmlUtil, AXPopupService } from 'acorex-ui'
import { AXFWidgetEditorComponent } from '../shared/widget-editor/widget-editor.component';
import { AXFBoxStyleValue } from '../../property-editor/editors/style/box-style/box-style.class';

export const WidgetInjector: { instance?: Injector } = {};


export abstract class AXFWidget {
    uid: string;
    config: WidgetConfig;
    parent: AXFWidget;
    widgets: WidgetConfig[] = [];


    onRefresh: EventEmitter<any> = new EventEmitter<any>();

    private widgetService: AXFWidgetService;


    constructor() {
        this.widgetService = WidgetInjector.instance.get(AXFWidgetService);
    }

    protected appendChild(name: string, options: any = {}) {
        let w = this.widgetService.resolve(name);
        if (!w.options)
            w.options = {};
        Object.assign(w.options, options);
        w.options.uid = AXHtmlUtil.getUID();
        w.options.parent = this;
        this.widgets.push(w);
        this.refresh();
    }

    refresh() {
        this.config.options.widgets = this.widgets;
        this.onRefresh.emit(this.config.options);
        this.onRender();
    }

    getJson() {

    }

    ngOnInit(): void {
        this.onRender();
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
        if (this["textAlign"]) {
            el.style.textAlign = this["textAlign"][0];
        }
        if (this["verticalAlign"]) {
            el.style.verticalAlign = this["verticalAlign"][0];
        }
        if (this["textDirection"]) {
            el.style.writingMode = this["textDirection"][0];
        }
        if (this["textStyle"]) {
            el.style.fontWeight = this["textStyle"].includes('bold') ? "bold" : "inherit";
            el.style.fontStyle = this["textStyle"].includes('italic') ? "italic" : "inherit";
            el.style.textDecoration = this["textStyle"].includes('underline') ? "underline" : "inherit";
        }
        
        // apply padding
        if (this["boxStyle"]) {
            let boxStyle = this["boxStyle"] as AXFBoxStyleValue;
            // apply padding size
            if (boxStyle.padding != null) {
                el.style.paddingTop = `${boxStyle.padding.top}px`;
                el.style.paddingBottom = `${boxStyle.padding.bottom}px`;
                el.style.paddingLeft = `${boxStyle.padding.left}px`;
                el.style.paddingRight = `${boxStyle.padding.right}px`;
            }
            // apply border size
            if (boxStyle.border != null) {
                el.style.borderTop = `${boxStyle.border.top}px solid var(--border-color)`;
                el.style.borderBottom = `${boxStyle.border.bottom}px solid var(--border-color)`;
                el.style.borderLeft = `${boxStyle.border.left}px solid var(--border-color)`;
                el.style.borderRight = `${boxStyle.border.right}px solid var(--border-color)`;
            }
            // apply margin size
            if (boxStyle.margin != null) {
                el.style.marginTop = `${boxStyle.margin.top}px`;
                el.style.marginBottom = `${boxStyle.margin.bottom}px`;
                el.style.marginLeft = `${boxStyle.margin.left}px`;
                el.style.marginRight = `${boxStyle.margin.right}px`;
            }
            
        }
    }

    onRender(): void {

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
        this.refresh();
    }

    edit() {
        this.popupService.open(AXFWidgetEditorComponent, {
            title: this.config.title,
            size: "lg",
            data: {
                config: this.config
            }
        }).closed((c) => {
            this.refresh();
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