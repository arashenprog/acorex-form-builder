import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    templateUrl: './dropdown-input-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDropdownInputWidgetView extends AXFValueWidgetView {

    @ViewChild('el') el: ElementRef<HTMLElement>;

    mode = 'single';

    allowSearch: boolean;
    dataSource: AXFDataSourceOption;
    isLoading = true;
    selectedItems: any = [];

    constructor(protected cdr: ChangeDetectorRef) {
        super(cdr);
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
        super.refresh();
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
        setTimeout(() => {  
                this.value = this.mode === 'single' ? null : [];
                this.refresh();  
        }, 1000); 
    }

    onOpen() {
        if (this.dataSource.mode === 'remote') {
            if (this.dataSource.dataItems == null || this.dataSource.dataItems.length === 0) {
                this.dataSource.dataSource.params.forEach(p => {
                    if (typeof (p.value) === 'string' && p.value.startsWith('$')) {
                        //p.value = '$' + this.resolveProperty(p.value.substring(1));
                        const name = p.value.substring(1);
                        p.value = () => {
                            return '$' + this.resolveProperty(name);
                        };
                    }
                });
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
    }

    // ****** api functions *******//
    setSelectedIndex(index: number) {
        const item = this.dataSource.dataItems[index];
        if (item) {
            this.value = item;
        }
    }
}
