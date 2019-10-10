import { Injectable } from '@angular/core';
import { AXPopupService } from 'acorex-ui';
import { AXFWidgetPickerComponent } from '../shared/widget-picker/widget-picker.component';




export interface WidgetConfig {
    title: string,
    icon: string,
    hint?: string,
    name: string;
    designerClass: any;
    viewClass: any;
    printClass: any;
    options?: any;
}


@Injectable({ providedIn: "root" })
export class AXFWidgetService {
    
    static WIDGET_ITEMS: WidgetConfig[] = [];

    constructor(private popup: AXPopupService) {

    }

    getList(): WidgetConfig[] {
        return AXFWidgetService.WIDGET_ITEMS;
    }

  

    register(config: WidgetConfig) {
        AXFWidgetService.WIDGET_ITEMS.push(config);
    }

    resolve(name: string): WidgetConfig {
        return AXFWidgetService.WIDGET_ITEMS.find(c => c.name == name)
    }

}