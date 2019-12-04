import { Component, OnInit } from '@angular/core';
import { AXBasePageComponent , AXDialogService} from 'acorex-ui';
import { AXFTemplateModel } from '../../../widget/services/db/database';
import { AXFTemplateService } from '../../../widget/services/template/template.service';
import { AXFWidgetService } from '../../../widget/services/widget.service';

@Component({
    templateUrl: './load-template.page.html',
    styleUrls: ['./load-template.page.scss']
})
export class AXFLoadTemplatePage extends AXBasePageComponent {

    templates: AXFTemplateModel[] = [];
    constructor(
        private templateService: AXFTemplateService,
        private widgetService: AXFWidgetService,
        private dialogService: AXDialogService
    ) { 
        super()
    }

    ngOnInit() {
        
        this.templateService.getFormList().then(c => {
            this.templates.push(...c);
        });
    }

    selectTemplate(tpl: AXFTemplateModel) {
        this.templateService.get(tpl.id).then(c => {
            debugger;
            let widget = this.widgetService.parse(c.template);
            this.close(widget.options.widgets);
        });
    }

}
