import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, QueryList, ContentChildren, ViewChildren, NgZone } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFBoxStyleValue } from '../../../../property-editor/editors/style/box-style/box-style.class';
import { AXFFormulaModel } from '../../../../property-editor/editors/action/formula.class';
import { Subscription } from 'rxjs';

@Component({
    selector: '[axf-page]',
    templateUrl: './page-widget.view.html',
    styleUrls: ['./page-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFPageWidgetView extends AXFWidgetView {

    formula: AXFFormulaModel[] = [];
    bgColor: string;
    themeColor: string;
    boxStyle: AXFBoxStyleValue;
    pageDirection: string;
    private dataSubscription: Subscription;

    constructor(private hostElement: ElementRef, private cdr: ChangeDetectorRef, private zone: NgZone) {
        super();
        this.dataSubscription = this.dataService.onChange.subscribe(data => {
            this.calcFormula();
        });
    }

    private calcFormula() {
        if (this.formula && this.formula.length) {
            this.formula.forEach(f => {
                const val = this.dataService.eval(f.expression);
                this.dataService.setValue(f.variable, val, false);
            });
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this.calcFormula();
    }

    onRender(): void {
        const el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        el.classList.remove('rtl', 'ltr');
        el.style.setProperty('--primary-color', this.themeColor, 'important');
        el.classList.add(this.pageDirection);
        this.applyStyle(el);
    }




    ngOnDestroy() {
        this.dataSubscription.unsubscribe();
    }
}

