import { Component, OnInit, ViewChild } from '@angular/core';
import { AXBasePageComponent, AXValidationFormComponent, AXDialogService, AXToastService } from 'acorex-ui';
import { AXFTemplateService } from '../../../widget/services/template/template.service';
import { WidgetConfig } from '../../../widget/services/widget.service';

@Component({
    templateUrl: './save-template.page.html',
})
export class AXFSaveTemplatePage extends AXBasePageComponent {

    @ViewChild(AXValidationFormComponent)
    form: AXValidationFormComponent;

    name: string;
    type: "form" | "widget";
    description: string;
    widget: WidgetConfig;

    constructor(
        private templateService: AXFTemplateService,
        private dialogService: AXDialogService,
        private toastService: AXToastService,
    ) {
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
                        this.dialogService.confirm("Replace", "There is a widget or form with same name,do you want to replace with ?").okay(() => {
                            this.templateService.saveForm(this.name, this.type, this.widget, this.description).then(s => {
                                if (s) this.close();
                                else this.toastService.error("Something isw wrong!")
                            })
                        })
                    }
                    else {
                        this.templateService.saveForm(this.name, this.type, this.widget, this.description).then(s => {
                            if (s) this.close();
                            else this.toastService.error("Something isw wrong!")
                        })
                    }
                })

            }
        })

    }
}
