import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXPopupService } from 'acorex-ui';
import { AXFProperyEditor } from '../../config/editor';
import { AXFActionOption } from './action.class';
import { AXIActionManageComponent } from './actionmanage.component';

@Component({
    template: `
        <ax-button (onClick)="showActions($event)" [text]="title" > 
        </ax-button>
    `,
})
export class AXFActionEditorComponent extends AXFProperyEditor<AXFActionOption[]>  {

    title:string="Manage Variables";
    constructor(protected cdr: ChangeDetectorRef,private popupService: AXPopupService) {
        super(cdr);
    }


    showActions(f: any) {
        this.popupService.open(AXIActionManageComponent, {
            title: 'Manage Variables',
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
