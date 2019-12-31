import { Component } from '@angular/core';
import { WidgetConfig, AXFWidgetService } from '../../services/widget.service';
import { AXBasePageComponent, AXDialogService } from 'acorex-ui';
import { AXFTemplateService } from '../../services/template/template.service';
import { AXFTemplateModel } from '../../services/db/database';

@Component({
    templateUrl: './widget-picker.component.html',
    styleUrls: ['./widget-picker.component.scss']
})
export class AXFWidgetPickerComponent extends AXBasePageComponent {

    list: WidgetConfig[];
    categories: string[] = [];
    templates: AXFTemplateModel[] = [];

    constructor(
        private templateService: AXFTemplateService,
        private widgetService: AXFWidgetService,
        private dialogService: AXDialogService,
    ) {
        super();
    }

    ngOnInit() {
        this.list.forEach(c => {
            if (!this.categories.includes(c.category)) {
                this.categories.push(c.category);
            }
        });
        this.templateService.getWidgetList().then(c => {
            if (c && c.length)
                this.templates.push(...c);
        });
    }

    selectWidget(widget: WidgetConfig) {
        this.close([widget]);
    }

    getList(cat: string): WidgetConfig[] {
        return this.list.filter(c => c.category == cat);
    }


    selectTemplate(tpl: AXFTemplateModel) {
        this.templateService.get(tpl.id).then(c => {
            let widget = this.widgetService.parse(c.template);
            this.dialogService.show(
                "Add saved widget",
                "Do you want to add it as a referenced widget?",
                ...[
                    { name: "cancel", text: "Cancel", type: "success" },
                    { name: "no", text: "No", type: "danger" },
                    { name: "yes", text: "Yes", type: "info" }
                ]
            ).then(name => {
                if (name == "yes") {
                    let outlet = this.widgetService.resolve("outlet");
                    outlet.options.widgetId = c.id;
                    this.close([outlet]);
                }
                else if (name == "no") {
                    this.close(widget.options.widgets);
                }
            });

        });
    }



}
