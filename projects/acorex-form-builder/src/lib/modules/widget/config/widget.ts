import { Injector } from '@angular/core';
import { AXFWidgetService, WidgetConfig } from '../services/widget.service';

export const WidgetInjector: { instance?: Injector } = {};


export abstract class AXFWidget {
    widgets: WidgetConfig[] = [];
    private widgetService:AXFWidgetService;

    constructor() {
        this.widgetService = WidgetInjector.instance.get(AXFWidgetService);
    }

    appendChild(name: string, options?: any) {
        let w = Object.assign({},  this.widgetService.resolve(name));
        w.options = options;
        this.widgets.push(w);
    }
}
export abstract class AXFWidgetDesigner extends AXFWidget {

    constructor() {
        super();
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