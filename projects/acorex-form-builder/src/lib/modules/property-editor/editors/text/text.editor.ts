import { Component, OnInit } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';

@Component({
    templateUrl: './text.editor.html',
    styleUrls: ['./text.editor.scss']
})
export class AXFTextEditorComponent extends AXFProperyEditor<string> implements OnInit {


    allowHtml: boolean = false;

    constructor() {
        super();
    }

    ngOnInit(): void { }
}
