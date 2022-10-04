import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AXBasePageComponent, AXPopupService } from 'acorex-ui';
import { ClosingAction } from 'acorex-ui/lib/components/nav/popup/popup.events';
import { AXFExpressionEditorComponent } from './expression-editor.component';
import { AXFFormulaModel } from './formula.class';

@Component({
    templateUrl: './formula-manage.component.html',
    styleUrls: ['./formula-manage.component.scss']
})
export class AXFFormulaManageComponent extends AXBasePageComponent {

    public data: AXFFormulaModel[] = [];
    typeItems:any[]=[{ value: "string", title: "String" },
    { value: "number", title: "Number" },
    { value: "boolean", title: "Boolean" },
    { value: "date", title: "Date" },
    { value: "time", title: "Time" },
    { value: "image", title: "Image" }];

    constructor(private popupService: AXPopupService) {
        super();
    }

    onClosing(e: ClosingAction) {
        e.data = {
            actions: this.data
        };
        e.resolve();
    }

    deleteClick(ind) {
        this.data.splice(ind, 1);
    }

    addItemClick() {
        if (!this.data) {
            this.data = [];
        }
        const index = this.data.length + 1;
        const newRow: AXFFormulaModel = { variable: 'var' + index.toString(), expression: '',dataType:'string'  };
        this.data.push(newRow);
    }

    handleShowEditor(ind, dt) {
        this.popupService.open(AXFExpressionEditorComponent, {
            title: 'Expression',
            size: 'lg',
            data: {
                code: dt
            }
        }).closed(c => {
            this.data[ind].expression = c.data;
        });
    }
}
