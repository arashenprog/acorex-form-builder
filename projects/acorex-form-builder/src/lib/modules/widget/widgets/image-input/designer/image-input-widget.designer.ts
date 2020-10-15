import { Component, ViewEncapsulation, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';

@Component({
    selector: "[axf-widget-image-input]",
    templateUrl: './image-input-widget.designer.html',
    styleUrls: ['../view/image-input-widget.view.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { style: 'display: flex;justify-content: center;align-items: center;' }
})
export class AXFImageInputWidgetDesigner extends AXFWidgetDesigner {


    height: number;
    width: number;

    constructor(private el: ElementRef<HTMLElement>, private cdr: ChangeDetectorRef) {
        super();
    }
}