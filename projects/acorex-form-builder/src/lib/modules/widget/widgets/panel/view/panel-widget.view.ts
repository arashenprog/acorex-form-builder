import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { Subscription } from 'rxjs';
import { AXFFormatService } from '../../../services/format.service';

@Component({
    selector: '[axf-panel]',
    templateUrl: './panel-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFPanelWidgetView extends AXFWidgetView {

    caption: string;
    allowCollapse: boolean;
    collapsed: boolean;
    internalCaption: string;
    private dataSubscription: Subscription;
    
    rIndex: number;

    constructor(private formatService: AXFFormatService) {
        super();
        this.dataSubscription = this.dataService.onChange.subscribe((data) => {
            this.internalCaption = this.formatService.format(this.caption, this);
        });
    }

    ngOnInit() {
        super.ngOnInit();
        debugger;
        this.internalCaption = this.formatService.format(this.caption, this);
    }


    ngOnDestroy() {
        this.dataSubscription.unsubscribe();
    }

    // ngDoCheck() {
    //     this.internalCaption = this.formatService.format(this.caption, this);
    // }
}

