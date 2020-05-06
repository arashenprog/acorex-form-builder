import { Component, OnInit, ViewChild } from '@angular/core';
import { AXBasePageComponent, AXValidationFormComponent, AXDialogService, AXToastService } from 'acorex-ui';
import { AXFTemplateService } from '../../../widget/services/template/template.service';
import { WidgetConfig } from '../../../widget/services/widget.service';
import { AFXSaveTemplateModel } from '../../../widget/services/db/database';

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
                            let param:AFXSaveTemplateModel= {name:this.name,type:this.type,widget:this.widget,description:this.description};
                            this.templateService.saveForm(param).then(s => {
                                if (s) this.close();
                                else this.toastService.error("Something isw wrong!")
                            })
                        })
                    }
                    else {
                        let param:AFXSaveTemplateModel= {name:this.name,type:this.type,widget:this.widget,description:this.description};
                        this.templateService.saveForm(param).then(s => {
                            if (s) this.close();
                            else this.toastService.error("Something isw wrong!")
                        })
                    }
                })

            }
        })

    }
}
