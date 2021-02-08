import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AXFFormulaModel } from '../../../../property-editor/editors/action/formula.class';
import { AXFWidgetView } from '../../../config/widget';

@Component({
    selector: '[axf-container]',
    templateUrl: './container-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AXFContainerWidgetView extends AXFWidgetView {

    @ViewChild('ff', { read: ElementRef, static: false })
    el: ElementRef<HTMLElement>;

    formula: AXFFormulaModel[] = [];
    private dataSubscription: Subscription;

    constructor(protected cdr: ChangeDetectorRef) {
        super();
        this.dataSubscription = this.dataService.onChange.subscribe(data => {
            this.calcFormula();
        });
    }

    private calcFormula() {
        if (this.formula && this.formula.length) {
            this.formula.forEach(f => {
                const val = this.dataService.eval(f.expression, this.getPath());
                this.dataService.setValue(`${this.getPath()}.${f.variable}`, val, false);
            });
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this.calcFormula();
    }


    onRender() {
        this.cdr.markForCheck();
        this.cdr.detectChanges();
        if (this.el) {
            this.applyStyle(this.el.nativeElement);
        }
    }

    ngOnDestroy() {
        this.dataSubscription.unsubscribe();
        super.ngOnDestroy();
    }
}

