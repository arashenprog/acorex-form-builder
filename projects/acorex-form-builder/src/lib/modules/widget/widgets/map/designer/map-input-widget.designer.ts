import { Component, ViewEncapsulation, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    selector: "[axf-widget-map]",
    templateUrl: './map-input-widget.designer.html',
    styleUrls: ['./map-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFMapInputWidgetDesigner extends AXFWidgetDesigner {
 
    height:number;
    width: number;
    constructor(private cdr: ChangeDetectorRef) { 
        super()
    }

    onRender(): void {
        this.cdr.markForCheck();
    }


}