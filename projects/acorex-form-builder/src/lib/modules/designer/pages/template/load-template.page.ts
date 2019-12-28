import { Component, OnInit } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';
import { AXFTemplateModel } from '../../../widget/services/db/database';
import { AXFWidgetService } from '../../../widget/services/widget.service';
import { AXFTemplateService } from '../../../widget/services/template/template.service';

@Component({
    templateUrl: './load-template.page.html',
    styleUrls: ['./load-template.page.scss']
})
export class AXFLoadTemplatePage extends AXBasePageComponent {

    templates: AXFTemplateModel[] = [];
    constructor(
        private templateService: AXFTemplateService,
        private widgetService: AXFWidgetService
    ) {
        super()
    }

    ngOnInit() {
        this.templateService.getFormList().then(c => {
            if (c && Array.isArray(c)) {
                this.templates.push(...c);
            }
        });
    }

    selectTemplate(tpl: AXFTemplateModel) {
        this.templateService.get(tpl.id).then(c => {
            let widget = this.widgetService.parse(c.template);
            this.close(widget);
        });
    }

}
