import { Component, ViewEncapsulation, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';

@Component({
    selector: "[axf-widget-signature]",
    templateUrl: './signature-input-widget.designer.html',
    styleUrls: ['./signature-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class AXFSignatureInputWidgetDesigner extends AXFWidgetDesigner {

    @ViewChild("el", { static: true }) el: ElementRef<HTMLElement>;
    height: number;
    width: number;
    info: { SignatureType: string[], StaffNumber: number, ShowType: string[], Items: any[] };
    columns: any[] = [];
    rows: any[] = [];
    constructor() {
        super()
    }

    onRender(): void {
        this.columns = this.info.Items.filter(w => w.Visible == true);
        this.rows = new Array(this.info.StaffNumber);
        this.applyStyle(this.el.nativeElement);
    }

    getStyles() {
        let lengthCol = 100.0 / this.info.Items.filter(w => w.Visible == true).length; 
        const styles = { 
            'width': lengthCol+"%"
        };
        return styles;
    }

}