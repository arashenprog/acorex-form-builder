import { Component, ViewChild } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';
import { AceEditorComponent } from 'ng2-ace-editor';
///


@Component({
    template: `
    <div ace-editor
        [text]="code"
        [mode]="'javascript'"
        [theme]="'tomorrow'"
        [options]="options"
        [autoUpdateContent]="true"
        (textChanged)="onChange($event)"
        style="min-height: 500px; width:100%; overflow: auto;">
    </div>
    `,
})
export class AXFExpressionEditorComponent extends AXBasePageComponent {

    options: any = {
        maxLines: 1000,
        printMargin: false,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        useWorker: false,
        fontSize: '16px',
        enableLiveAutocompletion: false
    };

    public code: string;

    constructor() {
        super();
    }


    onChange(code) {
        this.code = code;
    }

    onClosing(e) {
        e.data = this.code;
        e.resolve();
    }


}
