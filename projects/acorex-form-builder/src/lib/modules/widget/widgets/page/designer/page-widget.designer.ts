import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetDesigner, AXFContextMenuItem } from '../../../config/widget';
import { AXPopupService, EventService, AXToastService } from 'acorex-ui';
import { AXFBoxStyleValue } from '../../../../property-editor/editors/style/box-style/box-style.class';
import { AXFWidgetPickerService } from '../../../services/template/picker.service';

@Component({
    selector: '[axf-page]',
    templateUrl: './page-widget.designer.html',
    styleUrls: ['./page-widget.designer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: "axf-drop-zone"
    }
})
export class AXFPageWidgetDesigner extends AXFWidgetDesigner {

    bgColor: string;
    themeColor: string;
    boxStyle: AXFBoxStyleValue;
    pageDirection: string;

    private _showHeader: boolean;
    public get showHeader(): boolean {
        return this._showHeader;
    }
    public set showHeader(v: boolean) {
        debugger
        if (v != this._showHeader) {
            if (v) {
                if (!this.widgets.some(w => w.name == "page-header")) {
                    let header = this.widgetService.resolve("page-header");
                    this.widgets.splice(0, 0, header);
                }
            }
            else {
                debugger
                let headerindex = this.widgets.findIndex(w => w.name == "page-header");
                if (headerindex > -1)
                    this.widgets.splice(headerindex, 1);
            }
            this._showHeader = v;
        }
    }


    private _showFooter: boolean;
    public get showFooter(): boolean {
        return this._showFooter;
    }
    public set showFooter(v: boolean) {
        debugger
        if (v != this._showFooter) {
            if (v) {
                if (!this.widgets.some(w => w.name == "page-footer")) {
                    let footer = this.widgetService.resolve("page-footer");
                    this.widgets.push(footer);
                }
            }
            else {
                debugger
                let footerIndex = this.widgets.findIndex(w => w.name == "page-footer");
                if (footerIndex > -1)
                    this.widgets.splice(footerIndex, 1);
            }
            this._showFooter = v;
        }
    }

    constructor(
        eventService: EventService,
        private picker: AXFWidgetPickerService,
        private cdr: ChangeDetectorRef,
        private hostElement: ElementRef) {
        super();
        eventService.on("SELECT", c => {
            if (c == null) {
                eventService.broadcast("SELECT", this);
            }
        });
    }

    addElement() {
        this.picker.showPicker().then(widgets => {
            if (widgets) {
                widgets.forEach(w => {
                    this.addChild(w);
                });
            };
        })
    }


    onRender(): void {
        let el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        el.classList.remove("rtl", "ltr");
        el.classList.add(this.pageDirection);
        el.style.setProperty("--primary-color", this.themeColor);
        this.applyStyle(el);
        this.cdr.markForCheck();
    }

    onContextMenu(items: AXFContextMenuItem[]): AXFContextMenuItem[] {
        items = items.filter(c => c.action != "copy" && c.action != "delete");
        return items;
    }

    delete() {
        return false;
    }

}

