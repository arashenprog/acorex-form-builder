import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { AXPopupService, AXBasePageComponent, AXHtmlUtil, MenuItem, EventService } from 'acorex-ui';
import { WidgetConfig, AXFWidgetService } from '../../widget/services/widget.service';
import { AXFWidgetPickerComponent } from '../../widget/shared/widget-picker/widget-picker.component';
import { AXFWidget, AXFWidgetContainer, AXFWidgetDesigner } from '../../widget/config/widget';
import { AXFLoadTemplatePage } from './template/load-template.page';
import { AXFSaveTemplatePage } from './template/save-template.page';

@Component({
    templateUrl: './designer.page.html',
    styleUrls: ['./designer.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ACFDesignerPage extends AXBasePageComponent implements AXFWidgetContainer {
    constructor(
        private popup: AXPopupService,
        private widgetService: AXFWidgetService,
        private eventService: EventService


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
        },
        // {
        //     startIcon: "fas fa-print",
        //     name: "print",
        //     text: " Print View",
        //     groupName: "mode",
        //     style: "light",
        //     data: "print"
        // }
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
                },
                {
                    name: "saveAs",
                    text: "Save As ...",
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
        this.view = e.name;
        this.mode = e.data;
    }

    handleActionClick(e: MenuItem) {
        switch (e.name) {
            case "save":
                {
                    this.popup.open(AXFSaveTemplatePage, {
                        size: "sm",
                        title: "Save",
                        data: {
                            widget: this.widgets[0]
                        }
                    })
                    break;
                }
            case "saveAs":
                {
                    this.popup.open(AXFSaveTemplatePage, {
                        size: "sm",
                        title: "Save as ...",
                        data: {
                            widget: this.widgets[0].options.widgets
                        }
                    })
                    break;
                }
        }
    }

    handleStartClick() {
        this.widgetService.addWidget("page", this);
    }

    handleLoadClick() {
        this.popup.open(AXFLoadTemplatePage, "Load Template (coming soon ...)")
    }

    handleBreadcrumbClick(item: AXFWidgetDesigner) {
        this.eventService.broadcast("SELECT", item);
    }
}
