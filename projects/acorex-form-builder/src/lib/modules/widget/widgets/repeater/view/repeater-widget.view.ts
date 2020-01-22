import { Component, OnInit, ElementRef, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';
import { WidgetConfig } from '../../../services/widget.service';
import { JsonPipe } from '@angular/common';

@Component({
    selector: "[axf-repeater]",
    templateUrl: './repeater-widget.view.html',
    styleUrls: ['./repeater-widget.view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFRepeaterWidgetView extends AXFWidgetView {

    dataSource: AXFDataSourceOption;
    //items:any[]=[];
    @ViewChild("table", { static: true }) table: ElementRef<HTMLTableElement>;
    constructor(
        private cdr: ChangeDetectorRef) {
        super();
    }

    onRender() {
        this.applyStyle(this.table.nativeElement);
        this.cdr.markForCheck();
    }

    getHeader() {
        return this.widgets.filter(c => c.options.isHeader == true);
    }

    getBody() {
        if (!this.value) {
            this.value = [{}];
            if (this.dataSource.dataItems.length > 0)
                this.value = this.dataSource.dataItems;
        }

        let row = this.widgets.find(c => c.options.isHeader == false);
        if (this.value.length == 0)
            this.value = [{}];
        let items = Array.apply(null, new Array(this.value.length)).map(function () { return row });
        // items.forEach((f, index) => {
        //     //let tr=f.options.widget;

        //     f = this.setDataRepeater(f, this.value[index])
        // })
        return items;
    }

    setDataRepeater(row: WidgetConfig, f: any) {
        // if(row.options.text &&  row.options.text.includes("["))
        // {
        //     let list = row.options.text.match(/\[\S+\]/g);
        //     list.forEach(w => {
        //         row.options.text=f[w.substring(1, w.length - 1)];
        //     });
        // }
        if (row.category == "" && row.options.widgets)
            this.setDataRepeater(row.options.widgets[0], f);
        return row;
    }


    ngOnInit() {
    }

    addItemClick() {
        this.value.push({});
        this.cdr.markForCheck();
    }


}
