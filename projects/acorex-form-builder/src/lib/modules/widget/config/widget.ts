import { Injector } from '@angular/core';
import { AXFWidgetService, WidgetConfig } from '../services/widget.service';
import { AXHtmlUtil } from 'acorex-ui'

export const WidgetInjector: { instance?: Injector } = {};


export abstract class AXFWidget {
    uid: string;
    config: WidgetConfig;
    parent: AXFWidget;
    widgets: WidgetConfig[] = [];

    private widgetService: AXFWidgetService;

    constructor() {
        this.widgetService = WidgetInjector.instance.get(AXFWidgetService);
    }

    protected appendChild(name: string, options: any = {}) {
        let w = Object.assign({}, this.widgetService.resolve(name));
        w.options = options;
        w.options.uid = AXHtmlUtil.getUID();
        w.options.parent = this;
        this.widgets.push(w);
    }

    delete() {
        if (this.parent) {
            this.parent.widgets = this.parent.widgets.filter(c => c.options.uid != this.uid);
            this.parent.refresh();
        }
    }

    edit() {

    }

    refresh()
    {

    }

    getJson()
    {

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