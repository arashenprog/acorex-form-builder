import { Component, OnInit } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { AXFDataService } from '../../../widget/services/data.service';

@Component({
    template: `
        <ax-text-box (textChange)="handleValueChange($event)" [text]="value">
        </ax-text-box>
    `,
})
export class AXFEventEditorComponent extends AXFProperyEditor<string>  {
    constructor(private dataService: AXFDataService) {
        super();
    }
    handleValueChange(value: any) {
        super.handleValueChange(value);
    }
}
