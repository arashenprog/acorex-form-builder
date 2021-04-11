import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFDataService } from '../../../services/data.service';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    selector: "[axf-widget-question]",
    templateUrl: './question-widget.print.html',
    //styleUrls: ['./question-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFQuestionInputWidgetPrint extends AXFWidgetDesigner {


    dataSource: AXFDataSourceOption;
    mode: string;
    direction: string;
    alignCheck: string;
    alignCheckNew: string;
    viewType: string;
    columns:number;
    alignment: string;
    color: string;
    bgColor: string;
    fontSize:string;
    
    constructor( private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void {
        this.cdr.markForCheck();
    }


    getStyles(mode) {
        let currentSize=this.getSize();
        const styles = {
            'border-radius': mode == 'single' ? 100 + "%" : 0,
            'height':currentSize,
            'width':currentSize
        };
        return styles;
    }

    getSize() { 
        switch (this.fontSize) { 
            case 'xx-small':
            case 'x-small':
                return 13+'px';
            case 'smaller':
            case 'inherit':
                return 15+'px';
            case 'small':
                return 20+'px';
            case 'medium':
                return 25+'px';
            case 'large':
                return 30+'px';
            case 'larger':
                return 35+'px';
            case 'x-large':
            case 'xx-large':
                return 40+'px';
        }
    }
}




