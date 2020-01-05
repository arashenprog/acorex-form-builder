import { Component, ViewEncapsulation, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    selector: "[axf-widget-signature]",
    templateUrl: './signature-input-widget.designer.html',
    styleUrls: ['./signature-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFSignatureInputWidgetDesigner extends AXFWidgetDesigner {

    @ViewChild("el", { static: true }) el: ElementRef<HTMLElement>;   
    dataSource: AXFDataSourceOption;
    status:string;
    constructor(private cdr: ChangeDetectorRef) { 
        super()
    }

    onRender(): void {
        this.cdr.markForCheck();
    }


}