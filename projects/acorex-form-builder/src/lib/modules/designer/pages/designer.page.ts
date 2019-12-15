import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { AXPopupService, AXBasePageComponent, AXHtmlUtil, MenuItem, EventService, AXToastService } from 'acorex-ui';
import { WidgetConfig, AXFWidgetService } from '../../widget/services/widget.service';
import { AXFWidgetPickerComponent } from '../../widget/shared/widget-picker/widget-picker.component';
import { AXFWidget, AXFWidgetContainer, AXFWidgetDesigner } from '../../widget/config/widget';
import { AXFLoadTemplatePage } from './template/load-template.page';
import { AXFSaveTemplatePage } from './template/save-template.page';
import { AXFConnectService } from '../../widget/services/connect.service';

@Component({
    templateUrl: './designer.page.html',
    styleUrls: ['./designer.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ACFDesignerPage extends AXBasePageComponent implements AXFWidgetContainer {
    constructor(
        private popup: AXPopupService,
        private widgetService: AXFWidgetService,
        private toastService: AXToastService,
        private eventService: EventService,
        private connectService: AXFConnectService


    ) {
        super();
        eventService.on("SELECT", (c: AXFWidgetDesigner) => {
            if (c) {
                this.docTreeItems = [];
                this.docTreeItems.push(c);
                let parent: AXFWidgetDesigner = c.parent;
                while (parent != null && parent.config) {
                    this.docTreeItems.push(parent);
                    parent = parent.parent;
                }
                this.docTreeItems = this.docTreeItems.reverse();
            }
        });
    }

    docTreeItems: AXFWidgetDesigner[] = [];

    widgets: WidgetConfig[] = [];
    mode = "designer";
    view = "designer";

    viewModeItems: MenuItem[] = [
        {
            startIcon: "fas fa-paint-brush",
            name: "designer",
            text: " Design View",
            groupName: "mode",
            selected: true,
            style: "light",
            data: "designer"
        },
        {
            startIcon: "fas fa-desktop",
            name: "form",
            text: " Preview",
            groupName: "mode",
            style: "light",
            data: "view"
        }
    ]

    actionItems: MenuItem[] = [
        {
            startIcon: "fas fa-save",
            text: "Save",
            style: "ax-primary",
            items: [
                {
                    name: "save",
                    text: "Save",
                    visible: false
                },
                {
                    name: "saveAsForm",
                    text: "Save as Form...",
                },
                {
                    name: "saveAsWidget",
                    text: "Save as Widget...",
                }
            ]
        },
        {
            startIcon: "fas fa-check-circle",
            name: "publish",
            text: "Publish",
            style: "ax-secondary",
        },

    ]

    handleViewModeClick(e: MenuItem) {
        if (this.widgets == null || this.widgets.length == 0) {
            this.toastService.error("The form is blank!")
            return;
        }
        this.view = e.name;
        this.mode = e.data;
    }

    handleActionClick(e: MenuItem) {
        if (this.widgets == null || this.widgets.length == 0) {
            this.toastService.error("The form is blank!")
            return;
        }
        switch (e.name) {
            case "publish": {
                console.log(this.widgetService.serialize(this.widgets[0]));
                break;
            }
            case "save":
                {
                    // this.popup.open(AXFSaveTemplatePage, {
                    //     size: "sm",
                    //     title: "Save",
                    //     data: {
                    //         widget: this.widgets[0]
                    //     }
                    // })
                    break;
                }
            case "saveAsForm":
                {
                    this.popup.open(AXFSaveTemplatePage, {
                        size: "sm",
                        title: "Save as Form ...",
                        data: {
                            type: "form",
                            widget: this.widgets[0]
                        }
                    })
                    break;
                }
            case "saveAsWidget":
                {
                    this.popup.open(AXFSaveTemplatePage, {
                        size: "sm",
                        title: "Save as Widget ...",
                        data: {
                            type: "widget",
                            widget: this.widgets[0]
                        }
                    })
                    break;
                }
        }
    }

    handleStartClick() {
        let page = this.widgetService.resolve("page");
        Object.assign(page.options, { uid: AXHtmlUtil.getUID() });
        this.widgets.push(page);
    }

    handleLoadClick() {
        this.popup.open(AXFLoadTemplatePage, "Load Template").closed(c => {
            if (c.data) {
                let page = this.widgetService.resolve("page");
                Object.assign(page.options, { uid: AXHtmlUtil.getUID(), widgets: c.data });
                this.widgets.push(page);
            }
        });
    }

    handleBreadcrumbClick(item: AXFWidgetDesigner) {
        this.eventService.broadcast("SELECT", item);
    }

    ngAfterViewInit() {
        this.connectService.send("load").then(data => {
            if (data && data.widgets) {
                this.widgets = [this.widgetService.parse(data.widgets)];
            }
        })
    }
}
