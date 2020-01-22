import { Component, OnInit } from '@angular/core';
import { AXFTemplateService } from '../../../services/template/template.service';
import { AXFWidgetPrint } from '../../../config/widget';

@Component({
    selector: '[axf-outlet]',
    templateUrl: './outlet-widget.print.html'
})
export class AXFOutletWidgetPrint extends AXFWidgetPrint implements OnInit {
    widgetId: string;
    
    constructor( private templateService: AXFTemplateService) { 
        super();
    }
   

    ngOnInit() {
        this.templateService.get(this.widgetId).then(c => {
            this.widgets = this.widgetService.parse(c.template).options.widgets;
            this.refresh();
        });
    }
}

