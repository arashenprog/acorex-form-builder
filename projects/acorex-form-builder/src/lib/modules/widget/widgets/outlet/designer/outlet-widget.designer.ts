import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFTemplateService } from '../../../services/template/template.service';

@Component({
    selector: '[axf-outlet]',
    templateUrl: './outlet-widget.designer.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFOutletWidgetDesigner extends AXFWidgetDesigner {

    widgetId: string;
    isLoading: boolean = true;

    constructor(private cdr: ChangeDetectorRef, private templateService: AXFTemplateService) {
        super();
    }

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

