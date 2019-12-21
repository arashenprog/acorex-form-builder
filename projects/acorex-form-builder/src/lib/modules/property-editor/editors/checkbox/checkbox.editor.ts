import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFProperyEditor } from '../../config/editor';

@Component({
    templateUrl: "./checkbox.editor.html",
    styleUrls: ["./checkbox.editor.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFCheckboxEditorComponent extends AXFProperyEditor<boolean> {

    constructor(protected cdr: ChangeDetectorRef) {
        super();
    }

    // handleCheckChange(e) {
    //     this.handleValueChange(e.target.checked);
    // }

}
