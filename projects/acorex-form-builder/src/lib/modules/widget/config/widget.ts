import { Injector, EventEmitter, Input, Output } from '@angular/core';
import { AXFWidgetService, WidgetConfig } from '../services/widget.service';
import { AXHtmlUtil } from 'acorex-ui'
import { AXFBoxStyleValue } from '../../property-editor/editors/style/box-style/box-style.class';

export const WidgetInjector: { instance?: Injector } = {};

export interface AXFWidgetContainer {
    widgets: WidgetConfig[];
}


export abstract class AXFWidget implements AXFWidgetContainer {
    uid: string;
    config: WidgetConfig;


    @Output()
    widgetsChange: EventEmitter<WidgetConfig[]> = new EventEmitter<WidgetConfig[]>();

    @Input()
    public get widgets(): WidgetConfig[] {
        if (!this.config || !this.config.options)
            return []
        if (!this.config.options.widgets)
            this.config.options.widgets = [];
        return this.config.options.widgets;
    }
    public set widgets(v: WidgetConfig[]) {
        this.config.options.widgets = v;
        this.widgetsChange.emit(this.config.options.widgets);
    }

    protected widgetService: AXFWidgetService;


    constructor() {
        this.widgetService = WidgetInjector.instance.get(AXFWidgetService);
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
        if (this["fontSize"]) {
            el.style.fontSize = this["fontSize"][0];
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

    onSelect: EventEmitter<AXFWidget> = new EventEmitter<AXFWidget>();
    onDelete: EventEmitter<AXFWidget> = new EventEmitter<AXFWidget>();
    onRefresh: EventEmitter<any> = new EventEmitter<any>();
    isSelected: boolean = false;

    parent: AXFWidgetDesigner;

    constructor() {
        super();
    }


    refresh() {
        this.onRefresh.emit(this.config.options);
        this.onRender();
    }

    delete() {
        if (this.parent && this.parent.widgets) {
            this.parent.widgets = this.parent.widgets.filter(c => c.options.uid != this.uid);
            if (this.parent.refresh)
                this.parent.refresh();
        }
        this.onDelete.emit(this);
    }

    edit() {
        this.onSelect.emit(this);
    }

    copy() {

    }

    ngAfterViewInit() {
        if (this.isSelected) {
            this.edit();
        }
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