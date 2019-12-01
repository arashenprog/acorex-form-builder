import { Component, OnInit, ViewChild } from '@angular/core';
import { AXBasePageComponent, AXValidationFormComponent } from 'acorex-ui';
import { AXFTemplateService } from '../../../widget/services/template/template.service';
import { WidgetConfig } from '../../../widget/services/widget.service';

@Component({
    templateUrl: './save-template.page.html',
})
export class AXFSaveTemplatePage extends AXBasePageComponent {

    @ViewChild(AXValidationFormComponent)
    form: AXValidationFormComponent;

    name: string;
    widget: WidgetConfig;

    constructor(private templateService: AXFTemplateService) {
        super()
    }

    ngOnInit(): void { }


    handleCancelClick() {
        this.close();
    }

    handleSaveClick() {
        this.form.validate().then(c => {
            if (c.result) {
                this.templateService.checkExists(this.name).then(e => {
                    if (e) {

                    }
                    else {
                        this.templateService.saveForm(this.name, this.widget).then(s => {
                            this.close();
                        })
                    }
                })

            }
        })

    }
}
