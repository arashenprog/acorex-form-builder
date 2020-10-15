import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXPopupService } from 'acorex-ui';
import { AXFProperyEditor } from '../../config/editor';
import { AXFExpressionEditorComponent } from '../action/expression-editor.component';

@Component({
    template: `
        <ax-text-box  [(text)]="value" readonly="true">
            <ax-button (onClick)="handleShowEditor()">
                <i class="fas fas fa-code"></i>
            </ax-button>
        </ax-text-box>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFEventEditorComponent extends AXFProperyEditor<string>  {

    constructor(protected cdr: ChangeDetectorRef, private popupService: AXPopupService) {
        super(cdr);
    }


    handleValueChange(value: any) {
        super.handleValueChange(value);
    }

    ngAfterViewInit() {
        this.initiated = true;
    }

    handleShowEditor() {
        this.popupService.open(AXFExpressionEditorComponent, {
            title: 'Expression',
            size: 'lg',
            data: {
                code: this.value
            }
        }).closed(c => {
            super.handleValueChange(c.data);
        });
    }

}
