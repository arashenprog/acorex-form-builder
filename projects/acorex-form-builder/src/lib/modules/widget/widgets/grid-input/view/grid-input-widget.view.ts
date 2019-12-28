import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFDataService } from '../../../services/data.service';
import { AXFDataSourceValue } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    templateUrl: './grid-input-widget.view.html',
    styleUrls: ['./grid-input-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFGridInputWidgetView extends AXFWidgetView {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    value: string[];
    data: { columns: any[] };
    header: string;
    footer: string;
    dsMode: string;
    dsName: AXFDataSourceValue;
    rows: any[] = [];
    items: { content: any[] }
    visible:boolean = true;

    constructor(private dataService: AXFDataService, private cdr: ChangeDetectorRef) {
        super()
    }

    onRender(): void {
        if (this.el) {
            this.applyStyle(this.el.nativeElement);
            this.cdr.markForCheck();
            this.cdr.detectChanges();
        }
    }

    ngAfterViewInit() {
        if (this.dsMode == "ds") {
            // if (this.dsName)
            //     this.dataService.getList(this.dsName.name, this.dsName.params).then(it => {
            //         this.rows = it;
            //         this.refresh();
            //     });
        }
        else {
            this.rows = this.items.content;
            this.refresh();
        }
    }

    getRowData(row, item) {
        if (item.fieldName != null) {
            if (row.hasOwnProperty(item.fieldName)) {
                return row[item.fieldName];
            }
            return "";
        }
        else {
            if (row.hasOwnProperty(item.id)) {
                return row[item.id];
            }
            return item.defaultValue;
        }
    }

    handleValueChange(e) {

    }

}
