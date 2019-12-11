import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFDataService } from '../../../services/data.service';

@Component({
    templateUrl: './dropdown-input-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDropdownInputWidgetView extends AXFWidgetView {

    @ViewChild("el") el: ElementRef<HTMLElement>;

<<<<<<< HEAD
    value:string[];
    items:{ content:any[] };
    mode:string;
    fillBy:string; 
    allowSearch:boolean;
=======
    items: { ContentView: string[], Content: any[], ShowOther: boolean };
    mode: string;
    fillBy: string;
    allowSearch: boolean;
    dsName: string;
    dsMode: string;
>>>>>>> 9d146ed811848b4b6a02ed1d694453fd5aaadbc1

    constructor(private dataService: AXFDataService, private cdr: ChangeDetectorRef) {
        super()

    }

    ngAfterViewInit() {
     
        if (this.dsMode[0] == 'ds' && this.dsName) {
            this.dataService.getList(this.dsName).then(items => {
                this.items.Content = items;
                this.cdr.markForCheck();
            });
        }
    }

    onRender(): void {
        this.applyStyle(this.el.nativeElement);
    }


    handleValueChnage(e: any[]) {
        this.value = e;
    }
}
