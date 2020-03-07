import { Injectable } from '@angular/core';
import { AXPopupService, EventService, AXHtmlUtil, AXToastService } from 'acorex-ui';
import { AXFConnectService } from './connect.service';


export interface AXFWidgetProperty {
    name: string;
    title: string
    hint?: string;
    defaultValue?: any;
    category: "General" | "Style" | "Behavior" | "Data" | "Binding" | "Print";
    editor: any;
    visible?: boolean | Function;
    options?: any
    order?: number;
}

export interface AXFWidgetToolboxProperty {
    visible?: boolean;
    delete?: boolean;
    edite?: boolean;
    move?: boolean;
}

export interface WidgetConfig {
    title: string;
    icon: string;
    hint?: string;
    name: string;
    category: string;
    visible: boolean;
    container?: boolean;
    draggable?: boolean;
    droppable?: boolean,
    designerClass: any;
    viewClass: any;
    printClass: any;
    options?: any;
    properties: AXFWidgetProperty[];
    toolbox?: AXFWidgetToolboxProperty;
    dataContext?: any;
}


@Injectable({ providedIn: "root" })
export class AXFWidgetService {

    static WIDGET_ITEMS: WidgetConfig[] = [];

    constructor(private toastService: AXToastService, private connectService: AXFConnectService) {

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
            container: c.container,
            draggable: c.draggable,
            droppable: c.droppable,
            toolbox: c.toolbox,
            properties: []
        }
        if (c.properties)
            res.properties = this.deepCopy(c.properties);
        if (c.options)
            res.options = JSON.parse(JSON.stringify(c.options));
        else
            res.options = {};
        res.options.uid = AXHtmlUtil.getUID();
        return res;
    }


    private deepCopy(obj) {
        let copy;
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;
        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }
        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.deepCopy(obj[i]);
            }
            return copy;
        }
        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this.deepCopy(obj[attr]);
            }
            return copy;
        }
        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    serialize(item: WidgetConfig): string {
        return JSON.stringify(this.serializeInternal(item));
    }

    private serializeInternal(item: WidgetConfig): any {
        const obj: any = {};
        obj.name = item.name;
        obj.options = {};
        //        
        if (item.properties) {
            item.properties.forEach(p => {
                if (item.options[p.name] && item.options[p.name].clone) {
                    obj.options[p.name] = item.options[p.name].clone();
                } else {
                    obj.options[p.name] = item.options[p.name];
                }
            });
        }
        if (item.options && item.options.widgets && item.name !== 'outlet') {
            obj.options.widgets = [];
            item.options.widgets.forEach(w => {
                obj.options.widgets.push(this.serializeInternal(w));
            });
        }
        return obj;
    }


    parse(json: string | any): WidgetConfig {
        if (typeof json == "string") {
            try {
                let obj = JSON.parse(json);
                return this.parseInternal(obj);
            } catch (error) {
                console.log("Invalid widget's json to parse: ", json)
                return null;
            }
        }
        else {
            return this.parseInternal(json);
        }
    }

    clone(widget: WidgetConfig) {
        return this.parseInternal(this.serializeInternal(widget));
    }




    private parseInternal(obj: any): WidgetConfig {
        let item: WidgetConfig = this.resolve(obj.name);
        if (!item.options)
            item.options = {};
        item.options.uid = AXHtmlUtil.getUID();
        Object.assign(item.options, obj.options);
        if (obj.options.widgets) {
            item.options.widgets = []
            obj.options.widgets.forEach(w => {
                item.options.widgets.push(this.parseInternal(w));
            });
        }
        return item;
    }


    readPropsFromHost(name: string, tag: string): Promise<any> {
        return new Promise<any>((resolve) => {
            this.connectService.send('readProps', {
                name,
                tag
            }).then(c => {
                resolve(c);
            });
        });
    }
}