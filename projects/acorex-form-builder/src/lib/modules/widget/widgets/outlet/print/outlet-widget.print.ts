import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AXFTemplateService } from '../../../services/template/template.service';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: '[axf-outlet]',
    templateUrl: './outlet-widget.print.html'
})
export class AXFOutletWidgetPrint extends AXFWidgetPrint implements OnInit {
    widgetId: string;
    isLoading: boolean = true;
    loadingTimer:number = 0;
    loadingInterval:number = -1;

    
    constructor( private cdr: ChangeDetectorRef,private templateService: AXFTemplateService) { 
        super();
        this.loadingTimer = 0;
        this.loadingInterval = window.setInterval(()=>{
            this.loadingTimer++;
            this.cdr.markForCheck();
        },700);
    }

    ngOnInit() {
        if (this.widgets == null || this.widgets.length == 0) {
            this.templateService.get(this.widgetId).then(c => {
                this.widgets = this.widgetService.parse(c.template).options.widgets;
                this.isLoading = false;
                window.clearInterval(this.loadingInterval);
                this.refresh();
            });
        }
    }

    refresh(): void {
        this.cdr.markForCheck();
    }
}

