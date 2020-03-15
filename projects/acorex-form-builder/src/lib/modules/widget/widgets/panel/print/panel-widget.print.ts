import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXFFormatService } from '../../../services/format.service';

@Component({
    selector: '[axf-panel]',
    templateUrl: './panel-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFPanelWidgetPrint extends AXFWidgetPrint {

    caption: string;
    constructor(private formatService: AXFFormatService) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.caption = this.formatService.format(this.caption, this);
    }

}

