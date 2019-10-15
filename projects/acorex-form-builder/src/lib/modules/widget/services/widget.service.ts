import { Injectable } from '@angular/core';
import { AXPopupService } from 'acorex-ui';
import { AXFWidgetPickerComponent } from '../shared/widget-picker/widget-picker.component';


export interface AXFWidgetProperty {
    name: string;
    title: string
    hint?: string;
    defaultValue?: any;
    category: "General" | "Style" | "Behavior";
    editor: any
    options?:any
}

export interface WidgetConfig {
    title: string,
    icon: string,
    hint?: string,
    name: string;
    category: string;
    visible: boolean;
    designerClass: any;
    viewClass: any;
    printClass: any;
    options?: any;
    properties: AXFWidgetProperty[];
}


@Injectable({ providedIn: "root" })
export class AXFWidgetService {

    static WIDGET_ITEMS: WidgetConfig[] = [];

    constructor(private popup: AXPopupService) {

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
            properties: []
        }
        if (c.properties)
            res.properties = JSON.parse(JSON.stringify(c.properties));
        if (c.options)
            res.options = JSON.parse(JSON.stringify(c.options));
        return res;
    }

}