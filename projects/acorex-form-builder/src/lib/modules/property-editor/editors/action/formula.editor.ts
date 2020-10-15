import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AXPopupService } from 'acorex-ui';
import { AXFProperyEditor } from '../../config/editor';
import { AXFFormulaModel } from './formula.class';
import { AXFFormulaManageComponent } from './formula-manage.component';

@Component({
    template: `
        <ax-button (onClick)="showActions($event)" [text]="title" size="sm" block="true">
        </ax-button>
    `,
})
export class AXFActionEditorComponent extends AXFProperyEditor<AXFFormulaModel[]>  {

    title = 'Variables / Formula';
    constructor(protected cdr: ChangeDetectorRef, private popupService: AXPopupService) {
        super(cdr);
    }


    showActions(f: any) {
        this.popupService.open(AXFFormulaManageComponent, {
            title: this.title,
            size: 'md',
            data: {
                data: this.value
            }
        }).closed(c => {
            this.value = c.data.actions;
            super.handleValueChange(this.value);
        });
    }

}
