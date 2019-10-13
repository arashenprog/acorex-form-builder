import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AXFProperyEditor } from '../../../config/editor';

@Component({
    templateUrl: './box-style.editor.html',
    styleUrls: ['./box-style.editor.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AXFBoxStyleEditorComponent extends AXFProperyEditor<any> implements OnInit {
    constructor() {
        super();
    }

    ngOnInit(): void { }
}
