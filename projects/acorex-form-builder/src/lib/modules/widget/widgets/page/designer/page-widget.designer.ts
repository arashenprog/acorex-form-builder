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
        class: 'axf-drop-zone'
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

        if (v != this._showHeader) {
            if (v) {
                if (!this.widgets.some(w => w.name == 'page-header')) {
                    const header = this.widgetService.resolve('page-header');
                    this.widgets.splice(0, 0, header);
                }
            } else {

                const headerindex = this.widgets.findIndex(w => w.name === 'page-header');
                if (headerindex > -1) {
                    this.widgets.splice(headerindex, 1);
                }
            }
            this._showHeader = v;
        }
    }


    private _showFooter: boolean;
    public get showFooter(): boolean {
        return this._showFooter;
    }
    public set showFooter(v: boolean) {
        if (v !== this._showFooter) {
            if (v) {
                if (!this.widgets.some(w => w.name == 'page-footer')) {
                    const footer = this.widgetService.resolve('page-footer');
                    this.widgets.push(footer);
                }
            } else {
                const footerIndex = this.widgets.findIndex(w => w.name == 'page-footer');
                if (footerIndex > -1) {
                    this.widgets.splice(footerIndex, 1);
                }
            }
            this._showFooter = v;
        }
    }

    constructor(
        eventService: EventService,
        private cdr: ChangeDetectorRef,
        private hostElement: ElementRef) {
        super();
        eventService.on('SELECT', c => {
            if (c == null && !this.locked) {
                eventService.broadcast('SELECT', this);
            }
        });
    }




    onRender(): void {
        const el: HTMLElement = (this.hostElement.nativeElement as HTMLElement);
        el.classList.remove('rtl', 'ltr');
        el.classList.add(this.pageDirection);
        el.style.setProperty('--primary-color', this.themeColor);
        this.applyStyle(el);
        this.cdr.markForCheck();
    }

    onContextMenu(items: AXFContextMenuItem[]): AXFContextMenuItem[] {
        const exclute = ['copy', 'delete', 'cut', 'addElementBefore', 'addElementAfter', 'moveUp', 'moveDown'];
        items = items.filter(c => !exclute.some(i => i === c.action));
        return items;
    }

    delete() {
        return false;
    }



}

