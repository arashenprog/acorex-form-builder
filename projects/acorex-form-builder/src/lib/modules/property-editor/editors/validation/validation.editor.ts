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


    required: boolean = false;

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
        this.required = this.value.items.some(c => c.type === 'required');
    }

    handleRequiredChange(e) {
        if (e) {
            const rule1 = new AXValidationRule();
            rule1.type = 'required';
            rule1.message = 'Required';
            this.value.items.push(rule1);
        } else {
            this.value.items = this.value.items.filter(c => c.type !== 'required');
        }
        super.handleValueChange(this.value);

    }


}
