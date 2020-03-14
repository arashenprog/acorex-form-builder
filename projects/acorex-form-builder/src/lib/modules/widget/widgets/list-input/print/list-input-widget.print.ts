import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';
import { AXFDataService } from '../../../services/data.service';

@Component({
    templateUrl: './list-input-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFListInputWidgetPrint extends AXFWidgetPrint {
    @ViewChild("el") el: ElementRef<HTMLElement>;

    dataSource: AXFDataSourceOption;
    mode: string;
    direction: string;
    alignCheck: string;
    alignCheckNew: string;
    viewType: string;
    visible: boolean = true;
    printMode: string;
    columns: number;
    constructor(private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void {
        if (this.el)
            this.applyStyle(this.el.nativeElement);
        if (this.value == undefined && this.value == null && this.dataSource.mode == 'manual') {
            this.value = [];
            {
                this.value.push(this.dataSource.dataItems[0][this.dataSource.columns[0].fieldName]);
                this.cdr.markForCheck();
            }
        }
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
                if (this.value == undefined && this.value == null) {
                    this.value = [];
                    {
                        this.value.push(this.dataSource.dataItems[0][this.dataSource.columns[0].fieldName]);
                        this.cdr.markForCheck();
                    }
                }
                this.cdr.markForCheck();
            })
        }
    }

    getStylesRadio(viewType, alignCheckNew, alignCheck) {
        let styles: any = {};
        if (viewType == 'both') {
            switch (alignCheckNew) {
                case 'ItopCrightSleft':
                    styles = {
                        'order': '2'
                    };
                    break;
                case 'ItopCleftSright':
                    styles = {
                        'order': '1'
                    };
                    break;
                default:
                    break;
            }
        }
        else {
            switch (alignCheck) {
                case 'left':
                    styles = { 'order': '1' }
                    break;
                case 'top':
                    styles = { 'order': '1', 'flex': '1 0 100%' }
                    break;
                    case 'right':
                        styles = { 'right': '2px' } 
                        break;    
                default:
                    break;
            }
        }
        return styles;
    }

    getStylesSpan(viewType, alignCheckNew, alignCheck) {
        let styles: any = {};
        if (viewType == 'both') {
            switch (alignCheckNew) {
                case 'ItopCrightSleft':
                    styles = {
                        'order': '1'
                    };
                    break;
                case 'ItopCleftSright':
                    styles = {
                        'order': '2'
                    };
                    break;
                default:
                    break;
            }
        }
        else {
            switch (alignCheck) {
                case 'left':
                    styles = { 'order': '2' }
                    break;
                case 'top':
                    styles = { 'order': '2', 'margin-top': '22px' }
                    break;
                default:
                    break;
            }
        }
        return styles;
    }

    getStylesImage(viewType, alignCheckNew, alignCheck) {
        let styles: any = {};
        if (viewType == 'both') {
            switch (alignCheckNew) {
                case 'ItopCrightSleft':
                    styles = {
                        'order': '-1', 'flex': '1 0 100%'
                    };
                    break;
                case 'ItopCleftSright':
                    styles = {
                        'order': '-1', 'flex': '1 0 100%'
                    };
                    break;
                default:
                    break;
            }
        }
        else {
            switch (alignCheck) {
                case 'left':
                    styles = { 'order': '2' }
                    break;
                case 'top':
                    styles = { 'order': '2', 'margin-top': '22px' }
                    break;
                default:
                    break;
            }
        }
        return styles;
    }

}
