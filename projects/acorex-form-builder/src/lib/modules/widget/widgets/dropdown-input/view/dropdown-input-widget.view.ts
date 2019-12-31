import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFDataService } from '../../../services/data.service';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    templateUrl: './dropdown-input-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDropdownInputWidgetView extends AXFWidgetView {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    mode: string;

    allowSearch: boolean;
    dataSource: AXFDataSourceOption;
    

    constructor(private dataService: AXFDataService, private cdr: ChangeDetectorRef) {
        super()

    }

    ngAfterViewInit() {
        this.refresh();
    }

    onRender(): void {
        if (this.el)
            this.applyStyle(this.el.nativeElement);
        this.cdr.markForCheck();
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
        else
            this.cdr.markForCheck();
    }


    handleValueChange(e: any) {
        this.value = e;
        this.invokeEvent("onValueChange");
    }
}
