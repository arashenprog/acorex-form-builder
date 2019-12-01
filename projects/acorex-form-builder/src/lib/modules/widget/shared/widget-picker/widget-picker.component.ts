import { Component, OnInit } from '@angular/core';
import { WidgetConfig, AXFWidgetService } from '../../services/widget.service';
import { AXBasePageComponent } from 'acorex-ui';
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

    constructor(private templateService: AXFTemplateService,private widgetService: AXFWidgetService) {
        super();
    }

    ngOnInit() {
        this.list.forEach(c => {
            if (!this.categories.includes(c.category)) {
                this.categories.push(c.category);
            }
        });
        this.templateService.getFormList().then(c => {
            this.templates.push(...c);
        });
    }

    selectWidget(widget: WidgetConfig) {
        this.close(widget);
    }

    getList(cat: string): WidgetConfig[] {
        return this.list.filter(c => c.category == cat);
    }


    selectTemplate(tpl: AXFTemplateModel) {
        this.templateService.get(tpl.id).then(c=>{
            this.close(this.widgetService.parse(c.template));
        });
    }

   

}
