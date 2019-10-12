import { Injector } from '@angular/core';
import { AXFWidgetService, WidgetConfig } from '../services/widget.service';
import { AXHtmlUtil, AXPopupService } from 'acorex-ui'
import { AXFWidgetEditorComponent } from '../shared/widget-editor/widget-editor.component';

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



    refresh() {

    }

    getJson() {

    }

}
export abstract class AXFWidgetDesigner extends AXFWidget {

    private popupService: AXPopupService;
    constructor() {
        super();
        this.popupService = WidgetInjector.instance.get(AXPopupService);
    }

    delete() {
        if (this.parent) {
            this.parent.widgets = this.parent.widgets.filter(c => c.options.uid != this.uid);
            this.parent.refresh();
        }
    }

    edit() {
        this.popupService.open(AXFWidgetEditorComponent, {
            title: this.config.title,
            size: "lg",
            data: {
                config: this.config
            }
        }).closed((c) => {

        })
    }
    copy()
    {
        
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