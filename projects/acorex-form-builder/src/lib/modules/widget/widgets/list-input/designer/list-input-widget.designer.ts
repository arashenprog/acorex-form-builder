import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetDesigner } from '../../../config/widget';
import { AXFDataService } from '../../../services/data.service';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    selector: "[axf-widget-list]",
    templateUrl: './list-input-widget.designer.html',
    styleUrls: ['./list-input-widget.designer.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFListInputWidgetDesigner extends AXFWidgetDesigner {


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

    constructor(private cdr: ChangeDetectorRef, private dataService: AXFDataService,) {
        super()
    }

    onRender(): void {
        this.items = this.dataSource.dataItems;
        if (this.mode == 'single' && this.items && this.items.filter(s => s.DefaultValue == true).length) {
            let firstIndex = this.items.findIndex(s => s.DefaultValue == true);
            this.items.filter(s => s.DefaultValue == true && this.items.indexOf(s) != firstIndex)
                .forEach(
                    f => { f.DefaultValue = false; }
                );
            this.cdr.detectChanges();
        }
        if (this.dataSource.mode === 'remote' && !this.items) {
            this.dataSource.dataSource.params = [];
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
        else
            this.cdr.detectChanges();
        if (this.dataSource.mode === 'remote' && this.dataSource.dataItems && this.dataSource.displayMode === 'onlySelected' && this.dataSource.displayItems && this.dataSource.displayItems.length > 0) {
            this.items = this.dataSource.dataItems.filter(d => this.dataSource.displayItems.includes(d[this.dataSource.columns[0].fieldName]));
            this.cdr.detectChanges();
        }
    }


    getStyles(mode) {
        let currentSize = this.getSize();
        const styles = {
            'border-radius': mode == 'single' ? 100 + "%" : 0,
            'height': currentSize,
            'width': currentSize
        };
        return styles;
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
}





