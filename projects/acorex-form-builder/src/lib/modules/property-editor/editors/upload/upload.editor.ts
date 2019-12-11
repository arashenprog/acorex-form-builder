import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';

@Component({
    template: `
        <ax-upload-file type ="inline" (onLoad)="handleValueChange($event)" >
        </ax-upload-file>
    `,
})
export class AXFUploadEditorComponent extends AXFProperyEditor<string> implements OnInit {



    constructor(protected cdr: ChangeDetectorRef) {
        super();
    }


    ngOnInit(): void {
    }

    handleValueChange(evt) {
        this.value = evt.data;
    }
}