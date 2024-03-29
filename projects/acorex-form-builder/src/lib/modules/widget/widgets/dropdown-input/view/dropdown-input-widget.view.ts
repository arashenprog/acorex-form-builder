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
    items: any[] = [];

    constructor(protected cdr: ChangeDetectorRef, private ref: ElementRef, private zone: NgZone) {
        super(cdr);
        // this.valueChange.subscribe(() => { 
        //     this.selectedItems = this.value ? (Array.isArray(this.value) ? this.value : [this.value]) : [];
        //     this.cdr.detectChanges();
        // });
    }

    showItems()
    {
        return this.value ? (Array.isArray(this.value) ? this.value : [this.value]) : [];
    }

    onRender(): void {
        if (this.el) {
            this.applyStyle(this.el.nativeElement); 
        } 
        if (this.value == undefined && this['rIndex'] >= 0 && this['dataContext'] != undefined &&
            this['dataContext'].hasOwnProperty(this['name'])) {
            this.value = [this['dataContext'][this['name']]];
        }
        this.cdr.detectChanges();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        //this.refresh(); 
        this.items=this.dataSource.dataItems;
        if (this.dataSource.columns.filter(s => s.isDisplay).length > 1) {
            this.displays = this.dataSource.columns.filter(s => s.isDisplay)
                .map(function (m) { return { dataField: m.fieldName, title: m.title }; });
        }
        if(this.mode=='multiple')
        {
            if(Array.isArray(this.value) && this.value.length>0 && Array.isArray(this.value[0]))
                this.value=this.value[0];
        }
        if (this.dataSource.mode === 'manual' && this.dataSource.dataItems) {
            if(this.value)
            {
                if(Number.isInteger(this.value) || typeof(this.value)=='string')
                {
                    this.value= this.dataSource.dataItems.filter(w=>w[this.dataSource.columns[0].fieldName]==this.value);
                    this.cdr.detectChanges();
                }    
            }
            else
            {
                let defaultVals = this.dataSource.dataItems.filter(s => s.DefaultValue == true).map((s) => { return s.value });
                if (defaultVals.length > 0) {
                    this.value = defaultVals;
                    this.cdr.detectChanges();
                }
            }
            
        }
        if (this.dataSource.mode === 'remote') {
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
                if (this.dataSource.displayMode === 'onlySelected' && this.dataSource.displayItems && this.dataSource.displayItems.length > 0)
                    this.items = c.filter(d => this.dataSource.displayItems.includes(d[this.dataSource.columns[0].fieldName]));
                else
                    this.items = c;
                if(Number.isInteger(this.value))
                    this.value= this.dataSource.dataItems.filter(w=>w[this.dataSource.columns[0].fieldName]==this.value);
                this.cdr.detectChanges();
            });
        } 
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
                    if (this.dataSource.displayMode === 'onlySelected' && this.dataSource.displayItems && this.dataSource.displayItems.length > 0)
                        this.items = c.filter(d => this.dataSource.displayItems.includes(d[this.dataSource.columns[0].fieldName]));
                    else
                        this.items = c;
                    this.dataBound();
                });
            } else {
                this.dataBound();
            }
        }
        else
        this.dataBound();
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
