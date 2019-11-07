import { Injectable } from '@angular/core';
import { AXPopupService, PromisResult, AXHtmlUtil } from 'acorex-ui';
import { AXFWidgetPickerComponent } from '../shared/widget-picker/widget-picker.component';


export interface AXFWidgetProperty {
    name: string;
    title: string
    hint?: string;
    defaultValue?: any;
    category: "General" | "Style" | "Behavior" | "Data";
    editor: any
    options?: any
}

export interface AXFWidgetToolboxProperty {
    visible?: boolean;
    delete?: boolean;
    edite?: boolean;
}

export interface WidgetConfig {
    title: string;
    icon: string;
    hint?: string;
    name: string;
    category: string;
    visible: boolean;
    designerClass: any;
    viewClass: any;
    printClass: any;
    options?: any;
    properties: AXFWidgetProperty[];
    toolbox?: AXFWidgetToolboxProperty;
}


@Injectable({ providedIn: "root" })
export class AXFWidgetService {

    static WIDGET_ITEMS: WidgetConfig[] = [];

    constructor(private popup: AXPopupService) {

    }

    addWidget(): PromisResult<WidgetConfig> {
        return new PromisResult((resolve) => {
            this.popup.open(AXFWidgetPickerComponent, {
                title: "Add Element",
                size: "md",
                data: {
                    list: this.getList()
                }
            }).closed((c) => {
                if (c && c.data) {
                    let w = Object.assign({}, this.resolve((c.data as WidgetConfig).name));
                    if (!w.options)
                        w.options = {};
                    w.options.uid = AXHtmlUtil.getUID();
                    w.options.parent = this;
                    resolve(w);
                }
                else
                {
                    resolve(null);
                }
            })
        })
    }

    getList(category?: string): WidgetConfig[] {
        return AXFWidgetService.WIDGET_ITEMS.filter(c => c.visible && (category == null || c.category == category));
    }



    register(config: WidgetConfig) {
        AXFWidgetService.WIDGET_ITEMS.push(config);
    }

    resolve(name: string): WidgetConfig {
        let c = AXFWidgetService.WIDGET_ITEMS.find(c => c.name == name)
        let res: WidgetConfig = {
            category: c.category,
            hint: c.hint,
            icon: c.icon,
            name: c.name,
            title: c.title,
            designerClass: c.designerClass,
            printClass: c.printClass,
            viewClass: c.viewClass,
            visible: c.visible,
            toolbox: c.toolbox,
            properties: []
        }
        if (c.properties)
            res.properties = JSON.parse(JSON.stringify(c.properties));
        if (c.options)
            res.options = JSON.parse(JSON.stringify(c.options));
        return res;
    }


    serialize(items: WidgetConfig[]): string {
        let obj: any[] = [];
        items.forEach(i => {
            obj.push(this.serializeInternal(i))
        });
        return JSON.stringify(obj);
    }

    private serializeInternal(item: WidgetConfig): any {
        let obj: any = {};
        obj.name = item.name;
        obj.options = {};
        item.properties.forEach(p => {
            obj.options[p.name] = item.options[p.name]
        });
        if (item.options.widgets) {
            obj.options.widgets = [];
            item.options.widgets.forEach(w => {
                obj.options.widgets.push(this.serializeInternal(w));
            });
        }
        return obj;
    }


    parse(json: string): WidgetConfig[] {
        debugger;
        let items: WidgetConfig[] = [];
        let obj = JSON.parse(json);
        obj.forEach(o => {
            items.push(this.parseInternal(o));
        });
        return items;
    }

    private parseInternal(obj: any): WidgetConfig {
        let item: WidgetConfig = this.resolve(obj.name);
        if (!item.options)
            item.options = {};
        Object.assign(item.options, obj.options);
        if (obj.options.widgets) {
            item.options.widgets = []
            obj.options.widgets.forEach(w => {
                item.options.widgets.push(this.parseInternal(w));
            });
        }

        return item;
    }

}