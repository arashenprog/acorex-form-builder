import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { AXPopupService, AXBasePageComponent, AXHtmlUtil, MenuItem } from 'acorex-ui';
import { WidgetConfig, AXFWidgetService } from '../../widget/services/widget.service';
import { AXFWidgetPickerComponent } from '../../widget/shared/widget-picker/widget-picker.component';
import { AXFLoadTemplatePage } from '../../loadtemplate/pages/loadtemplate.page';
import { AXFWidget } from '../../widget/config/widget';

@Component({
    selector: 'acf-designer',
    templateUrl: './designer.page.html',
    styleUrls: ['./designer.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ACFDesignerPage extends AXBasePageComponent {
    constructor(private popup: AXPopupService, private widgetService: AXFWidgetService) { super() }


    widgets: WidgetConfig[] = [];


    mode = "designer";
    view = "designer";

    viewModeItems:MenuItem[]=[
        {
            startIcon:"fas fa-paint-brush",
            name:"designer",
            text:" Design View",
            groupName:"mode",
            selected:true,
            style:"light",
            data:"designer"
        },
        {
            startIcon:"fas fa-desktop",
            name:"form",
            text:" Form View",
            groupName:"mode",
            style:"light",
            data:"view"
        },
        {
            startIcon:"fas fa-mobile-alt",
            name:"mobile",
            text:" Mobile View",
            groupName:"mode",
            style:"light",
            data:"view"
        },
        {
            startIcon:"fas fa-print",
            name:"print",
            text:" Print View",
            groupName:"mode",
            style:"light",
            disable:true,
            data:"print"
        }
    ]

    ngOnInit(): void {
    }



    handleViewModeClick(e:MenuItem)
    {
        this.view = e.name;
        this.mode = e.data;
    }

    handleStartClick() {
        this.popup.open(AXFWidgetPickerComponent, {
            title: "Add Element",
            size: "md"
        }).closed((c) => {
            if (c && c.data) {
                let w = Object.assign({}, this.widgetService.resolve((c.data as WidgetConfig).name));
                if (!w.options)
                    w.options = {};
                w.options.uid = AXHtmlUtil.getUID();
                w.options.parent = this;
                this.widgets.push(w);
            }
        })
    }
    handleLoadClick() {
        this.popup.open(AXFLoadTemplatePage, "Load Template (coming soon ...)")
    }

    handleRender(a: AXFWidget) {
    }

    ngDoCheck() {

    }
}
