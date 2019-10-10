import { Injector } from '@angular/core';
import { AXFWidgetService, WidgetConfig } from './widget.service';

export const WidgetInjector: { instance?: Injector } = {};


export abstract class AXFWidget {
    widgets: WidgetConfig[] = [];


    constructor() {

    }

    appendChild(name: string, options?: any) {
        debugger;
        const service = WidgetInjector.instance.get(AXFWidgetService);
        let w = Object.assign({}, service.resolve(name));
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