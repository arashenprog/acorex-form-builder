import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AXFFormulaModel } from '../../../../property-editor/editors/action/formula.class';
import { AXFWidgetView } from '../../../config/widget';
import { AXFTemplateService } from '../../../services/template/template.service';

@Component({
    selector: '[axf-outlet]',
    templateUrl: './outlet-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFOutletWidgetView extends AXFWidgetView {

    constructor(private cdr: ChangeDetectorRef, private templateService: AXFTemplateService) {
        super();
        //
        this.dataSubscription = this.dataService.onChange.subscribe(data => {
            this.calcFormula();
        });
    }

    widgetId: string;
    isLoading: boolean = true;

    formula: AXFFormulaModel[] = [];
    private dataSubscription: Subscription;

    ngOnInit() {
        this.templateService.get(this.widgetId).then(c => {
            const page = this.widgetService.parse(c.template);
            this.formula = page.options.formula;
            this.widgets = page.options.widgets;
            this.isLoading = false;
            this.calcFormula();
            this.refresh();
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

    refresh(): void {
        this.cdr.markForCheck();
    }

    ngOnDestroy() {
        this.dataSubscription.unsubscribe();
    }

}

