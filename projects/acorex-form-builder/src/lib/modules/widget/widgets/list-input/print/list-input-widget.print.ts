import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';
import { AXFDataService } from '../../../services/data.service';

@Component({
    templateUrl: './list-input-widget.print.html',
    changeDetection:ChangeDetectionStrategy.OnPush,
    //styleUrls: ['./list-input-widget.print.scss']
})
export class AXFListInputWidgetPrint extends AXFWidgetPrint {
    @ViewChild("el") el: ElementRef<HTMLElement>;

    dataSource: AXFDataSourceOption;
    mode: string;
    direction: string;
    alignCheck: string;
    viewType: string;
    visible: boolean = true;
    printMode:string;

    constructor(private dataService: AXFDataService, private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void {
        if (this.el)
            this.applyStyle(this.el.nativeElement);
    }

    ngAfterViewInit() {
        this.refresh();
    }

    refresh() {
        if (this.dataSource.mode == "remote") {
            this.dataService.getList(
                this.dataSource.dataSource.name,
                this.dataSource.dataSource.params
            ).then(c => {
                this.dataSource.dataItems = c;
                this.cdr.markForCheck();
            })
        }
    }

    getStyles(mode) { 
        const styles = {
            'border-radius': mode=='single' ? 100 + "%" : 0
        };
        return styles;
    }
}
