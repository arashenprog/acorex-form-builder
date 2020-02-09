import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
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
    isLoading: boolean = true;

    selectedItems: any = [];

    constructor(private cdr: ChangeDetectorRef) {
        super();
        this.valueChange.subscribe(() => {
            this.selectedItems = this.value ? (Array.isArray(this.value) ? this.value : [this.value]) : [];
            this.cdr.markForCheck();
        });
    }

    onRender(): void {
        if (this.el) {
            this.applyStyle(this.el.nativeElement);
        }
        this.cdr.markForCheck();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.refresh();
    }

    refresh() {
        this.isLoading = true;
        if (this.dataSource.mode === 'remote') {
            this.dataSource.dataItems = [];
        } else {
            this.dataBound();
        }
    }

    private dataBound() {
        this.isLoading = false;
        this.invokeEvent('onDataBound');
        this.cdr.markForCheck();
    }


    handleValueChange(e: any) {
        this.value = this.mode === 'single' ? e[0] : e;
    }

    reload() {
        this.value = this.mode === 'single' ? null : [];
        this.refresh();
    }

    onOpen() {
        if (this.dataSource.mode === 'remote' && (this.dataSource.dataItems == null || this.dataSource.dataItems.length === 0)) {
            this.dataService.getList(
                this.dataSource.dataSource.name,
                this.dataSource.dataSource.params
            ).then(c => {
                this.dataSource.dataItems = c;
                this.dataBound();
            });
        }
    }
}
