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

    private valChangeObserver: any;

    constructor() {
        super();
        this.value = new AXFBoxStyleValue();
    }

    ngOnInit(): void { }


    handleInnerValueChange(e: string, style: string, position: string) {
        this.value[style][position] = e;
        if (position == "top" && this.prevValue[style].top == this.prevValue[style].left)
            this.value[style].left = this.value[style].top;
        if (position == "top" && this.prevValue[style].top == this.prevValue[style].right)
            this.value[style].right = this.value[style].top;
        if (position == "top" && this.prevValue[style].bottom == this.prevValue[style].bottom)
            this.value[style].bottom = this.value[style].top;
        //
        this.prevValue = JSON.parse(JSON.stringify(this.value));
        super.handleValueChange(this.value);
    }
}
