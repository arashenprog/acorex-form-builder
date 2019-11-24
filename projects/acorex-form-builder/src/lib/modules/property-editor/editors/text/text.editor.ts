import { Component, OnInit } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';
import { AXPopupService } from 'acorex-ui';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { AXFRichTextComponent } from './rich-text.component';

@Component({
    templateUrl: './text.editor.html',
    styleUrls: ['./text.editor.scss']
})
export class AXFTextEditorComponent extends AXFProperyEditor<string> implements OnInit {

    allowHtml: boolean = false;

    constructor(private popupService: AXPopupService) {
        super();
    }

    ngOnInit(): void { }

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
