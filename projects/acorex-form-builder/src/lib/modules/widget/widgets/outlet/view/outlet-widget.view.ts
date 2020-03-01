import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
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

    }
    widgetId: string;
    isLoading: boolean = true;

    ngOnInit() {

        this.templateService.get(this.widgetId).then(c => {
            this.widgets = this.widgetService.parse(c.template).options.widgets;
            this.isLoading = false;
            this.refresh();
        });
    }

    refresh(): void {
        this.cdr.markForCheck();
    }
}

