import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFDataService } from '../../../services/data.service';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    selector: "[axf-widget-text]",
    templateUrl: './list-input-widget.designer.html',
    styleUrls: ['./list-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFListInputWidgetDesigner extends AXFWidgetDesigner {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    dataSource: AXFDataSourceOption;
    mode: string;
    direction: string;
    alignCheck: string;
    viewType: string;


    constructor( private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void {
        if (this.el)
            this.applyStyle(this.el.nativeElement);
        this.cdr.markForCheck();
    }


    getStyles(mode) {
        const styles = {
            'border-radius': mode == 'single' ? 100 + "%" : 0
        };
        return styles;
    }

}




