import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetView } from '../../../config/widget';
import { AXFDataService } from '../../../services/data.service';
import { ContentItemsStructureEditor } from '../../../../property-editor/editors/items/itemstructure.editor';
import { AXFDataSourceValue } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    templateUrl: './dropdown-input-widget.view.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDropdownInputWidgetView extends AXFWidgetView {

    @ViewChild("el") el: ElementRef<HTMLElement>;

    items: { content: any[], types: ContentItemsStructureEditor[] };
    mode: string;
    fillBy: string;
    allowSearch: boolean;
    dsName: AXFDataSourceValue;
    dsMode: string;
    visible: boolean;

    constructor(private dataService: AXFDataService, private cdr: ChangeDetectorRef) {
        super()

    }

    ngAfterViewInit() {
        this.refresh(false);
    }

    onRender(): void {
        if (this.el)
            this.applyStyle(this.el.nativeElement);
        this.cdr.markForCheck();
    }


    refresh(clear: boolean = true) {
        if (this.dsMode[0] == 'ds' && this.dsName) {
            this.dataService.getList(this.dsName.name, this.dsName.params).then(items => {
                this.items.content = items;
                if (clear)
                    this.handleValueChnage([]);
                super.refresh();
            });
        }
    }


    handleValueChnage(e: any[]) {
        this.value = e;
        this.invokeEvent("onValueChange");
    }
}
