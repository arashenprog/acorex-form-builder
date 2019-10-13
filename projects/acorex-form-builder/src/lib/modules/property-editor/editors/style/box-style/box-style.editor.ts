import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AXFProperyEditor } from '../../../config/editor';
import { AXFBoxStyleValue } from './box-style.class';

@Component({
    templateUrl: './box-style.editor.html',
    styleUrls: ['./box-style.editor.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AXFBoxStyleEditorComponent extends AXFProperyEditor<AXFBoxStyleValue> implements OnInit {

    private prevValue = new AXFBoxStyleValue();

    constructor() {
        super();
        this.value = new AXFBoxStyleValue();
    }

    ngOnInit(): void { }


    handleInnerValueChange(e: string) {
        if (this.value.padding.top != 0 && this.prevValue.padding.top == this.prevValue.padding.left)
            this.value.padding.left = this.value.padding.top;
        this.prevValue = Object.assign({},this.value);
        super.handleValueChange(this.value);
    }
}
