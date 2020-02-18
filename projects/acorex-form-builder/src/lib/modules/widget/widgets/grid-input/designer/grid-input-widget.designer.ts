import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';


@Component({
    selector: "[axf-widget-text]",
    templateUrl: './grid-input-widget.designer.html',
    styleUrls: ['./grid-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFGridInputWidgetDesigner extends AXFWidgetDesigner {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    value: string[];
    dataSource: AXFDataSourceOption;

    allowAddDelete: boolean;
    // private _allowAddDelete: boolean;
    // public get allowAddDelete():boolean {
    //     return this._allowAddDelete;
    // }
    // public set allowAddDelete(v: boolean) {
    //     if (v !== this._allowAddDelete) {
    //         this._allowAddDelete = v;
    //     }
    // }

    constructor(private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void {
        if (this.el)
            this.applyStyle(this.el.nativeElement);
        this.cdr.markForCheck();
    }

    handleValueChange(e) {

    }
}




