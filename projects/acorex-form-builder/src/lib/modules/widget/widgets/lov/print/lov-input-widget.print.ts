import { Component, ViewEncapsulation, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';
import { AXFWidgetDesigner, AXFWidgetPrint } from '../../../config/widget';

@Component({ 
    templateUrl: './lov-input-widget.print.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFLovInputWidgetPrint extends AXFWidgetPrint {

    @ViewChild("el") el: ElementRef<HTMLElement>;
    dataSource: AXFDataSourceOption;
    text: string;
    
    constructor(private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void {
        if (this.el) {
            this.applyStyle(this.el.nativeElement);
        }
        this.cdr.detectChanges();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.value) {
            let colBase= this.dataSource.columns.find(w=>w.isDisplay);
            if(!colBase)
                colBase=this.dataSource.columns[0];
            if (Array.isArray(this.value)) {
                this.text = this.value.map(c => c[colBase.fieldName]).join(', ');
            }
            else {
                this.text = this.value[colBase.fieldName];
            }
            this.cdr.detectChanges();
        }
    }
   
}




