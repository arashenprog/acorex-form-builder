import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { AXFValueWidgetView } from '../../../config/widget';
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
    displays: any[] = null;

    constructor(protected cdr: ChangeDetectorRef, private ref: ElementRef, private zone: NgZone) {
        super(cdr);
        this.valueChange.subscribe(() => { 
            this.selectedItems = this.value ? (Array.isArray(this.value) ? this.value : [this.value]) : [];
            this.cdr.detectChanges();
        });
    }

    onRender(): void {
        if (this.el) {
            this.applyStyle(this.el.nativeElement);
            this.cdr.detectChanges();
        } 
        if (this.value == undefined && this['rIndex'] >= 0 && this['dataContext'] != undefined &&
            this['dataContext'].hasOwnProperty(this['name'])) {
                if(this.dataSource.mode=='remote')
                {
                    this.dataSource.dataSource.params.forEach(p => {
                        if (typeof (p.value) === 'string' && p.value.startsWith('$')) {
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
                        let val=this['dataContext'][this['name']];
                        if(typeof this['dataContext'][this['name']]=='object')
                            val =this['dataContext'][this['name']][this.dataSource.columns[0]['fieldName']]; 
                        this.selectedItems = this.dataSource.dataItems.filter(w=>w[this.dataSource.columns[0]['fieldName']]==val); 
                        this.dataBound();
                    });
                }
                else
                    this.selectedItems = this.dataSource.dataItems.filter(w=>w[this.dataSource.columns[0]['fieldName']]==this['dataContext'][this['name']]); 
            this.cdr.detectChanges();
        } 
    }

    ngAfterViewInit() { 
        if (this.dataSource.columns.filter(s => s.isDisplay).length > 1) {
            this.displays = this.dataSource.columns.filter(s => s.isDisplay)
                .map(function (m) { return { dataField: m.fieldName, title: m.title }; });
        }
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
            if (!this.readonly) {
                this.value = this.mode === 'single' ? null : [];
                this.refresh();
            }
        }, 2000);
    }

    onOpen() {
        if (this.dataSource.mode === 'remote') {
            if (this.dataSource.dataItems == null || this.dataSource.dataItems.length === 0) {
                this.dataSource.dataSource.params.forEach(p => {
                    if (typeof (p.value) === 'string' && p.value.startsWith('$')) {
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


    handleItemClick(item)
    {
        this.invokeEvent('onItemClick');
    }
}
