import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { AXPopupService } from 'acorex-ui';
import { AXFRichTextComponent } from './rich-text.component';

@Component({
    templateUrl: './text.editor.html',
    styleUrls: ['./text.editor.scss']
})
export class AXFTextEditorComponent extends AXFProperyEditor<string>  {

    allowHtml: boolean = false;

    

    constructor(protected cdr: ChangeDetectorRef,private popupService: AXPopupService) {
        super();
    }


    handleShowEditor() {
        this.popupService.open(AXFRichTextComponent, {
            title: "Rich Text",
            size: "md",
            data: {
                data: this.value
            }
        }).closed(c => {
            this.handleValueChange(c.data);
        })
    }

    handleValueChange(value: any) {
        super.handleValueChange(value);
    }
}
