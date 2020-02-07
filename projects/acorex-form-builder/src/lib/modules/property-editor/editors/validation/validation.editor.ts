import { Component, ViewEncapsulation, ChangeDetectorRef, OnInit } from '@angular/core';
import { AXFValidatorProp } from './validation.class';
import { AXFProperyEditor } from '../../config/editor';
import { AXValidationRule } from 'acorex-ui';

@Component({
    templateUrl: './validation.editor.html',
    styleUrls: ['./validation.editor.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AXFValidationEditorComponent extends AXFProperyEditor<AXFValidatorProp> implements OnInit {


    constructor(protected cdr: ChangeDetectorRef) {
        super();
        this.value = new AXFValidatorProp();
    }

    ngOnInit(): void {
        if (!this.value) {
            this.value = new AXFValidatorProp();
        } else {
            const v: AXFValidatorProp = new AXFValidatorProp();
            Object.assign(v, this.value);
            this.value = v;
        }
    }




    add() {
        const rule1 = new AXValidationRule();
        rule1.type = 'required';
        rule1.message = 'Required';
        this.value.items.push(rule1);
        super.handleValueChange(this.value);
        // const rule2 = new AXValidationRule();
        // rule2.type = 'email';
        // rule2.message = 'Invalid email address!';
        // this.validator.items.push(rule2);
    }
}
