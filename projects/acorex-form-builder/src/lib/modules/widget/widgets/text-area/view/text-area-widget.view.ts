import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';

@Component({
    selector: '[axf-widget-text]',
    templateUrl: './text-area-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFTextAreaWidgetView extends AXFValueWidgetView {

    placeholder: string;
    rows: number;
    private dataSubscription: Subscription;


    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
        this.dataSubscription = this.dataService.onChange.subscribe(() => {
            this.refresh();
        });
    }

    onRender(): void {
        if (this.value == undefined && this['rIndex'] >= 0 && this['dataContext'] != undefined &&
            this['dataContext'].hasOwnProperty(this['name'])) {
            this.value = this['dataContext'][this['name']];
        }
        this.cdr.markForCheck();
    }

    ngOnDestroy() {
        this.dataSubscription.unsubscribe();
        super.ngOnDestroy();
    }
}
