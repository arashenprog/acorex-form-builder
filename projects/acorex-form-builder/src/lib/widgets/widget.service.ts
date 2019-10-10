import { Injectable, ComponentFactoryResolver, Renderer2, ApplicationRef, Injector } from '@angular/core';




export interface WidgetConfig {
    name: string;
    designerClass: any;
    viewClass: any;
    printClass: any;
    options?: any;
}


@Injectable({ providedIn: "root" })
export class AXFWidgetService {
    static WIDGET_ITEMS: WidgetConfig[] = [];

    register(config: WidgetConfig) {
        AXFWidgetService.WIDGET_ITEMS.push(config);
    }

    resolve(name: string): WidgetConfig {
        return AXFWidgetService.WIDGET_ITEMS.find(c => c.name == name)
    }

}