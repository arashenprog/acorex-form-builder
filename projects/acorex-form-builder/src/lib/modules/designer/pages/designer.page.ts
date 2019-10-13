import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { AXPopupService, AXBasePageComponent, AXHtmlUtil } from 'acorex-ui';
import { WidgetConfig, AXFWidgetService } from '../../widget/services/widget.service';
import { AXFWidgetPickerComponent } from '../../widget/shared/widget-picker/widget-picker.component';
import { AXFLoadTemplatePage } from '../../loadtemplate/pages/loadtemplate.page';

@Component({
    selector: 'acf-designer',
    templateUrl: './designer.page.html',
    styleUrls: ['./designer.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ACFDesignerPage extends AXBasePageComponent {
    constructor(private popup: AXPopupService, private widgetService: AXFWidgetService) { super() }


    widgets: WidgetConfig[] = [];


    ngOnInit(): void {
    }

    handleStartClick() {
        this.popup.open(AXFWidgetPickerComponent, {
            title: "Add Element",
            size: "md"
        }).closed((c) => {
            if (c && c.data) {
                let w = Object.assign({}, this.widgetService.resolve((c.data as WidgetConfig).name));
                w.options = {};
                w.options.uid = AXHtmlUtil.getUID();
                w.options.parent = this;
                this.widgets.push(w);
            }
        })
    }
    handleLoadClick(){
        this.popup.open(AXFLoadTemplatePage,"Load Template (coming soon ...)")
    }
}
