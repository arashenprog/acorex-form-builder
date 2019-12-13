import { Injector, EventEmitter, Input, Output, Directive } from '@angular/core';
import { AXFWidgetService, WidgetConfig } from '../services/widget.service';
import { AXHtmlUtil, EventService } from 'acorex-ui'
import { AXFBoxStyleValue } from '../../property-editor/editors/style/box-style/box-style.class';
import { AXFFormService, EventData } from '../services/form.service';
import { EventHandlerVars } from '@angular/compiler/src/compiler_util/expression_converter';

export const WidgetInjector: { instance?: Injector } = {};

export interface AXFWidgetContainer {
    widgets: WidgetConfig[];
}


@Directive()
export abstract class AXFWidget implements AXFWidgetContainer {
    uid: string;
    config: WidgetConfig;
    parent: any;


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
            el.style.fontSize = this["fontSize"];
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

    addChild(widget: WidgetConfig, options?: any) {
        let w = this.widgetService.parse(this.widgetService.serialize(widget));
        if (!w.options)
            w.options = {};
        Object.assign(w.options, options);
        w.options.uid = AXHtmlUtil.getUID();
        this.widgets.push(w);
    }


}
export abstract class AXFWidgetView extends AXFWidget {

    protected formService: AXFFormService;

    @Output()
    valueChange: EventEmitter<any> = new EventEmitter();

    private _value: any;

    @Input()
    public get value(): any {
        return this._value;
    }
    public set value(v: any) {
        this._value = v;
        this.valueChange.emit(v);
        let name: string = this.getName();
        if (name) {
            this.formService.setValue(name, v)
        }
        this.invokeEvent("onValueChange")
    }

    private getName() {
        return this.config.options.name
        // if (this.config.options.name == null || this.config.options.name == "")
        //     return null;
        // let parts: string[] = [this.config.options.name];
        // let prt = this.parent;
        // while (prt != null) {
        //     if (prt.config.options.name) {
        //         parts.push(prt.config.options.name)
        //     }
        //     prt=prt.parent;
        // }
        // return parts.reverse().join('.');
    }



    protected invokeEvent(name: string) {
        if (this[name]) {
            let action: string = this[name];
            if (action) {
                action.split(';').forEach(act => {
                    if (act == "submit()") {
                        this.formService.submit();
                        return;
                    }
                    let allWidgets = act.match(/\#([a-zA-Z1-9])+/g);
                    let allVars = act.match(/\$([a-zA-Z1-9])+/g);
                    let execCode = act.replace('#', 'this._').replace('$', 'this.$');
                    let params = {};
                    if (allWidgets) {
                        allWidgets.forEach(w => {
                            params['_' + w.substring(1)] = this.formService.getWidget(w.substring(1));
                        });
                    }
                    if (allVars) {
                        allVars.forEach(v => {
                            params[v] = this.formService.getValue(v.substring(1));
                        });
                    }
                    new Function(execCode).call(params);
                })

            }
        }
    }






    constructor() {
        super();
        this.formService = WidgetInjector.instance.get(AXFFormService);
        setTimeout(() => {
            this.formService.setWidget(this.getName(), this);
        });
    }

}
export abstract class AXFWidgetPrint extends AXFWidget {
    constructor() {
        super();
    }

}