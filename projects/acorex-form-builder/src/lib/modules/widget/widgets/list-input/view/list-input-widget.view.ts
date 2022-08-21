import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetView, AXFValueWidgetView } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';
import { AXFConnectService } from '../../../services/connect.service';

@Component({
    templateUrl: './list-input-widget.view.html',
    styleUrls: ['./list-input-widget.view.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFListInputWidgetView extends AXFValueWidgetView {

    dataSource: AXFDataSourceOption;
    mode: string;
    direction: string;
    alignCheck: string;
    alignCheckNew: string;
    viewType: string;
    columns: number;
    alignment: string;
    color: string;
    bgColor: string;
    fontSize: string;
    items: any[] = [];
    constructor(protected cdr: ChangeDetectorRef, private connectService: AXFConnectService) {
        super(cdr);
    }

    onRender(): void {
        if (this.value == undefined && this['rIndex'] >= 0 && this['dataContext'] != undefined &&
            this['dataContext'].hasOwnProperty(this['name'])) {
            this.value = [(this['dataContext'][this['name']]).toString()];
        }
        this.cdr.detectChanges();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        //this.refresh();
        if (this.dataSource.mode === 'remote' && this.dataSource.dataItems && this.dataSource.displayMode === 'onlySelected' && this.dataSource.displayItems && this.dataSource.displayItems.length > 0)
            this.items = this.dataSource.dataItems.filter(d => this.dataSource.displayItems.includes(d[this.dataSource.columns[0].fieldName]));
        else
            this.items = this.dataSource.dataItems;

        if (this.value == undefined && this.dataSource.dataItems  && this.dataSource.mode === 'manual') {
            let defaultVals = this.dataSource.dataItems.filter(s => s.DefaultValue == true).map((s) => { return s.value });
            if (defaultVals.length > 0) {
                this.value = defaultVals; 
            }
        }
        this.cdr.detectChanges();
        if (this.dataSource.mode === 'remote' && !this.dataSource.dataItems) {
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
                this.cdr.detectChanges();
            });
        }
    }

    refresh() {
        if (this.dataSource.mode === 'remote') {
            this.dataService.getList(
                this.dataSource.dataSource.name,
                this.dataSource.dataSource.params
            ).then(c => {
                this.dataSource.dataItems = c;
                if (this.dataSource.displayMode === 'onlySelected' && this.dataSource.displayItems && this.dataSource.displayItems.length > 0)
                    this.items = c.filter(d => this.dataSource.displayItems.includes(d[this.dataSource.columns[0].fieldName]));
                else
                    this.items = c;
                super.refresh();
            });
        } else {
            super.refresh();
        }
    }

    getStyles(mode) {
        let currentSize = this.getSize();
        const styles = {
            'border-radius': mode === 'single' ? 100 + '%' : 0,
            'height': currentSize,
            'width': currentSize
        };
        return styles;
    }

    onCheckValueChange(val) {
        if (this.readonly) {
            return;
        }

        if (this.mode === 'single') {
            this.value = [val];
        } else {
            if (!this.value) {
                this.value = [];
            }

            if (!this.value.includes(val)) {
                this.value = [...this.value, ...[val]];
            } else {
                this.value = this.value.filter(c => c !== val);
            }
        }
        this.invokeEvent('onItemClick');
    }

    getSize() {
        switch (this.fontSize) {
            case 'xx-small':
                return 11 + 'px';
            case 'x-small':
                return 13 + 'px';
            case 'smaller':
            case 'inherit':
                return 15 + 'px';
            case 'small':
                return 20 + 'px';
            case 'medium':
                return 25 + 'px';
            case 'large':
                return 30 + 'px';
            case 'larger':
                return 35 + 'px';
            case 'x-large':
            case 'xx-large':
                return 40 + 'px';
        }
    }

    getMargin() {
        switch (this.fontSize) {
            case 'xx-small':
            case 'x-small':
                return 18 + 'px';
            case 'smaller':
            case 'inherit':
                return 20 + 'px';
            case 'small':
                return 25 + 'px';
            case 'medium':
                return 30 + 'px';
            case 'large':
                return 35 + 'px';
            case 'larger':
                return 40 + 'px';
            case 'x-large':
            case 'xx-large':
                return 45 + 'px';
        }
    }
 
    openFile(fileID) {
        this.connectService.send('openUrl',{url:fileID}) 
    }
}
