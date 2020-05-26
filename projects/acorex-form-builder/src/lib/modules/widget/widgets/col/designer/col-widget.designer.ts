import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetDesigner, AXFContextMenuItem } from '../../../config/widget';
import { AXFBoxStyleValue } from '../../../../property-editor/editors/style/box-style/box-style.class';
import { AXFWidgetPickerService } from '../../../services/template/picker.service';

@Component({
    selector: "[axf-widget-col]",
    templateUrl: './col-widget.designer.html',
    styleUrls: ['./col-widget.designer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: "axf-drop-zone" }
})
export class AXFColWidgetDesigner extends AXFWidgetDesigner {

    size: number = 1;
    color: string;
    bgColor: string;
    boxStyle: AXFBoxStyleValue;



    constructor(
        private hostElement: ElementRef,
        private picker: AXFWidgetPickerService,
        private cdr: ChangeDetectorRef) {
        super();
    }

    onRender(): void {
        const el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        el.classList.forEach(c => {
            if (c.startsWith('col-md')) {
                el.classList.remove(c);
            }
        });
        el.classList.add('col-sm-12', `col-md-${this.size}`);
        this.applyStyle(this.hostElement.nativeElement);
        this.cdr.markForCheck();
        this.parent.refresh();
    }

    getContextMenu() {
        return super.getContextMenu().filter(c =>
            c.action !== 'addElementBefore' &&
            c.action !== 'addElementAfter'
        );
    }

    
}
