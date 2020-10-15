import { Component, OnInit } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';
import { AngularEditorConfig } from '@kolkov/angular-editor';
///


@Component({
    template: `
        <angular-editor  [ngModel]="data" (ngModelChange)="setValue($event)" [config]="editorConfig"></angular-editor>
    `,
})
export class AXFRichTextComponent extends AXBasePageComponent {

    public data: string;

    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '500px',
        placeholder: 'Enter text here...',
        translate: 'no',
        sanitize: false,
        toolbarHiddenButtons: [
            [],
            [
                'insertImage',
                'insertVideo'
            ]
        ]
    };

    constructor() {
        super();
    }

    setValue(value) {
        this.data = value;
    }

    onClosing(e) {
        e.data = this.data;
        e.resolve();
    }


}
