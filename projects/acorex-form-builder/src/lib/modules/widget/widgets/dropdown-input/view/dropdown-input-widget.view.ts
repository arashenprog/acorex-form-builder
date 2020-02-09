import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFDataService } from '../../../services/data.service';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    templateUrl: './dropdown-input-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDropdownInputWidgetView extends AXFWidgetView {

    @ViewChild('el') el: ElementRef<HTMLElement>;

    mode: string = 'single';

    allowSearch: boolean;
    dataSource: AXFDataSourceOption;

    private isDataBound: boolean = false;
    selectedItems: any = [];

    constructor(private cdr: ChangeDetectorRef) {
        super();
        this.valueChange.subscribe(() => {
            if (this.isDataBound) {
                this.invokeEvent('onValueChange');
            }
        });
    }

    ngAfterViewInit() {
        this.refresh();
    }

    onRender(): void {
        if (this.el) {
            this.applyStyle(this.el.nativeElement);
        }
        this.cdr.markForCheck();
    }


    refresh() {
        this.isDataBound = false;
        if (this.dataSource.mode === 'remote') {
            this.dataService.getList(
                this.dataSource.dataSource.name,
                this.dataSource.dataSource.params
            ).then(c => {
                this.dataSource.dataItems = c;
                this.dataBound();
            });
        } else {
            this.dataBound();
        }
    }

    private dataBound() {
        this.isDataBound = true;
        this.selectedItems = this.value ? (Array.isArray(this.value) ? this.value : [this.value]) : [];
        this.invokeEvent('onDataBound');
        this.cdr.markForCheck();
    }


    handleValueChange(e: any) {
        this.value = e;
    }

    reload() {
        this.value = this.mode === 'single' ? null : [];
        this.refresh();
    }
}
