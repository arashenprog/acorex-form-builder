import { Injector, EventEmitter, Input, Output, Directive, ChangeDetectorRef } from '@angular/core';
import { AXFWidgetService, WidgetConfig } from '../services/widget.service';
import { AXHtmlUtil, AXToastService, IValidationRuleResult } from 'acorex-ui';
import { AXFBoxStyleValue } from '../../property-editor/editors/style/box-style/box-style.class';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AXFDataService } from '../services/data.service';

export const WidgetInjector: { instance?: Injector } = {};

export interface AXFWidgetContainer {
    widgets: WidgetConfig[];
}

export interface AXFContextMenuItem {
    text: string;
    icon?: string;
    action?: string;
    separator?: boolean;
    items?: AXFContextMenuItem[];
    widget?: AXFWidgetDesigner;
}


export interface AXFValidatableWidget {
    validate(): Promise<IValidationRuleResult>;
}


@Directive()
export abstract class AXFWidget implements AXFWidgetContainer {


    @Input()
    public get widgets(): WidgetConfig[] {
        if (!this.config || !this.config.options) {
            return [];
        }
        if (!this.config.options.widgets) {
            this.config.options.widgets = [];
        }
        return this.config.options.widgets;
    }
    public set widgets(v: WidgetConfig[]) {
        this.config.options.widgets = v;
        this.widgetsChange.emit(this.config.options.widgets);
    }


    constructor() {
        this.widgetService = WidgetInjector.instance.get(AXFWidgetService);

    }
    uid: string;
    config: WidgetConfig;
    parent: any;

    @Output()
    widgetsChange: EventEmitter<WidgetConfig[]> = new EventEmitter<WidgetConfig[]>();

    protected widgetService: AXFWidgetService;

    private renderChangeObserver: any;

    ngOnInit(): void {
        (<any>this.config).$owner = this;
        this.onRender();
    }

    applyStyle(el: HTMLElement): void {
        el.style.backgroundColor = this['bgColor'];
        el.style.color = this['color'];
        el.style.textAlign = this['textAlign'];
        el.style.fontSize = this['fontSize'];
        el.style.verticalAlign = this['verticalAlign'];
        el.style.writingMode = this['textDirection'];
        if (this['textStyle']) {
            el.style.fontWeight = this['textStyle'].includes('bold') ? 'bold' : 'inherit';
            el.style.fontStyle = this['textStyle'].includes('italic') ? 'italic' : 'inherit';
            el.style.textDecoration = this['textStyle'].includes('underline') ? 'underline' : 'inherit';
            el.style.wordBreak=this['textStyle'].includes('break') ? 'break-all' :'unset'
        }
        el.style.width = this['width'];
        el.style.height = this['height'];
        // apply padding
        if (this['boxStyle']) {
            const boxStyle = this['boxStyle'] as AXFBoxStyleValue;
            // apply padding size
            if (boxStyle.padding != null) {
                el.style.paddingTop = `${boxStyle.padding.top}px`;
                el.style.paddingBottom = `${boxStyle.padding.bottom}px`;
                el.style.paddingLeft = `${boxStyle.padding.left}px`;
                el.style.paddingRight = `${boxStyle.padding.right}px`;
            }
            // apply border size
            if (boxStyle.border != null) {
                el.style.borderTop = `${boxStyle.border.top}px solid #333`;
                el.style.borderBottom = `${boxStyle.border.bottom}px solid #333`;
                el.style.borderLeft = `${boxStyle.border.left}px solid #333`;
                el.style.borderRight = `${boxStyle.border.right}px solid #333`;
            }
            // apply margin size
            if (boxStyle.margin != null) {
                el.style.marginTop = `${boxStyle.margin.top}px`;
                el.style.marginBottom = `${boxStyle.margin.bottom}px`;
                el.style.marginLeft = `${boxStyle.margin.left}px`;
                el.style.marginRight = `${boxStyle.margin.right}px`;
            }

        }
    }

    refresh() {
        if (!this.renderChangeObserver) {
            Observable.create(observer => {
                this.renderChangeObserver = observer;
            })
                .pipe(debounceTime(100))
                .pipe(distinctUntilChanged())
                .subscribe(c => {
                    Object.assign(this, this.config.options);
                    this.onRender();
                });
        }
        this.renderChangeObserver.next(new Date().getTime());
    }
    onRender(): void {

    }

}
export abstract class AXFWidgetDesigner extends AXFWidget {

    onSelect: EventEmitter<AXFWidget> = new EventEmitter<AXFWidget>();
    onDelete: EventEmitter<AXFWidget> = new EventEmitter<AXFWidget>();


    constructor() {
        super();
    }



    delete() {
        if (this.parent && this.parent.widgets) {
            this.parent.widgets = this.parent.widgets.filter(c => c.options.uid != this.uid);
            if (this.parent.refresh) {
                this.parent.refresh();
            }
        }
        this.onDelete.emit(this);
    }

    edit() {
        this.onSelect.emit(this);
    }

    copy() {
        sessionStorage.setItem('clipboard', this.widgetService.serialize(this.config));
        WidgetInjector.instance.get(AXToastService).success('Widget copied!');
    }
    cut() {
        this.copy();
        this.delete();
    }
    paste() {
        const cp = sessionStorage.getItem('clipboard');
        if (cp) {
            const config = this.widgetService.parse(cp);
            if (config && this.config.container) {
                this.addChild(config);
                WidgetInjector.instance.get(AXToastService).success('Widget pasted!');
                sessionStorage.removeItem('clipboard');
            }
        }
    }

    addChild(widget: WidgetConfig, options?: any) {
        const w = this.widgetService.parse(this.widgetService.serialize(widget));
        if (!w.options) {
            w.options = {};
        }
        Object.assign(w.options, options);
        this.widgets.push(w);
        this.refresh();
    }


    getContextMenu(parents: boolean = true): AXFContextMenuItem[] {
        let items: AXFContextMenuItem[] = [];
        items.push(
            {
                text: 'Select',
                icon: 'fas fa-mouse-pointer',
                action: 'edit',
                separator: true,
                widget: this
            });
        if (this.config.container && this.config.droppable !== false) {
            const cp = sessionStorage.getItem('clipboard');
            if (cp) {
                items.push({
                    text: 'Paste',
                    icon: 'fas fa-paste',
                    action: 'paste',
                    widget: this,
                });
            }
            items.push({
                text: 'Add Widget',
                icon: 'fas fa-plus',
                action: 'addElement',
                separator: true,
                widget: this,
            });
        }
        items.push(...[
            {
                text: 'Delete',
                icon: 'fas fa-trash',
                action: 'delete',
                widget: this
            },
            {
                text: 'Copy',
                icon: 'fas fa-copy',
                action: 'copy',
                widget: this,
            },
            {
                text: 'Cut',
                icon: 'fas fa-cut',
                action: 'cut',
                separator: true,
                widget: this,
            }
        ]);
        let p = this.parent;
        while (p != null && parents) {
            if (p.config && p.config.name !== 'page') {
                items.push({
                    text: p.config.title,
                    icon: p.config.icon,
                    separator: true,
                    items: [
                        ...p.getContextMenu(false)
                    ],
                    widget: p
                });
            }
            p = p.parent;
        }
        if (this['onContextMenu']) {
            items = this['onContextMenu'](items);
        }
        return items;
    }

    findIndex(): number {
        const index = this.parent.widgets.findIndex(c => c.options.uid == this.config.options.uid);
        return index;
    }


}
export abstract class AXFWidgetView extends AXFWidget {

    visible: boolean;

    protected dataService: AXFDataService;

    protected getPath() {
        if (this.config.options.name == null || this.config.options.name === '') {
            return null;
        }
        if (this['rIndex'] >= 0) {
            return this.getParentPath() ?
                `${this.getParentPath()}[${this['rIndex']}].${this.config.options.name}`
                : `${this.config.options.name}[${this['rIndex']}]`;
        }
        return this.getParentPath() ?
            `${this.getParentPath()}.${this.config.options.name}`
            : this.config.options.name;
    }

    protected getParentPath() {
        const parts: string[] = [];
        let prt = this.parent;
        while (prt != null) {
            if (prt.config && prt.config.options &&
                (prt.config.options.name ||
                    (prt.rIndex !== undefined && prt.config.name !== 'table-cell' && prt.config.name !== 'table-row')
                )
            ) {
                if (prt.rIndex !== undefined) {
                    parts.push(`[${prt.rIndex}]`);
                } else {
                    parts.push(prt.config.options.name);
                }
            }
            prt = prt.parent;
        }
        return parts.reverse().join('.').split('.[').join('[');
    }


    protected invokeEvent(name: string) {
        if (this[name]) {
            const action: string = this[name];
            if (action) {
                action.split(';').forEach(act => {
                    if (act === 'submit()') {
                        this.dataService.submit();
                        return;
                    }
                    const allWidgets = act.match(/\#([a-zA-Z1-9])+/g);
                    const allVars = act.match(/\$([a-zA-Z1-9])+/g);
                    let execCode = act;
                    const params = {};
                    if (allWidgets) {
                        allWidgets.forEach(w => {
                            const wname = this.getParentPath() ? `${this.getParentPath()}.${w.substring(1)}` : w.substring(1);
                            const widget = this.dataService.getWidget(wname);
                            let p = '_' + wname.split('.').join('_');
                            p = p.replace(/\[/, '').replace(/]/, '');
                            params[p] = widget;
                            execCode = execCode.replace(w, '#' + p);
                        });
                    }
                    if (allVars) {
                        allVars.forEach(v => {
                            params[v] = this.dataService.getValue(this.resolveProperty(v));
                        });
                    }
                    execCode = execCode.replace('#', 'this.').replace('$', 'this.$');
                    execCode = execCode.replace(/\[/, '').replace(/]/, '');
                    new Function(`try {${execCode}} catch(e){  }`).call(params);
                    // if (allWidgets) {
                    //     allWidgets.forEach(w => {
                    //         const wname = this.getParentName() ? `${this.getParentName()}.${w.substring(1)}` : w.substring(1);
                    //         if (params['_' + wname.replace('.', '_')]) {
                    //             params['_' + wname.replace('.', '_')].refresh();
                    //         }
                    //     });
                    // }
                });

            }
        }
    }



    protected resolveProperty(name: string): any {
        return this.getParentPath() && !name.startsWith(`$${this.getParentPath()}.`)
            ? name.replace('$', `$${this.getParentPath()}.`)
            : name;
    }


    constructor() {
        super();
        this.dataService = WidgetInjector.instance.get(AXFDataService);
    }

    ngAfterViewInit() {
        this.register();
    }

    protected register() {
        if (this.getPath()) {
            this.dataService.setWidget(this.getPath(), this);
        }
    }
}


export abstract class AXFValueWidgetView extends AXFWidgetView {

    readOnly: boolean;

    constructor(protected cdr: ChangeDetectorRef) {
        super();
    }

    @Output()
    valueChange: EventEmitter<any> = new EventEmitter();

    private _value: any;
    @Input()
    public get value(): any {
        return this._value;
    }
    public set value(v: any) {
        if (JSON.stringify(v) !== JSON.stringify(this._value)) {
            this._value = v;
            this.valueChange.emit(v);
            const name: string = this.getPath();
            if (name) {
                this.dataService.setValue(name, v);
            }
            this.invokeEvent('onValueChange');
            this.cdr.markForCheck();
            this.cdr.detectChanges();
        }
    }

    protected extractValue(): any {
        if (this.getPath()) {
            return this.dataService.getValue(this.getPath());
        }
        return null;
    }

    ngAfterViewInit() {
        this.value = this.extractValue();
        super.ngAfterViewInit();
    }
}



export abstract class AXFWidgetPrint extends AXFWidget {
    constructor() {
        super();
    }
    value: any;
    visible: boolean;

    protected resolveProperty(name: string): any {
        return this.getParentPath() && !name.startsWith(`$${this.getParentPath()}.`)
            ? name.replace('$', `$${this.getParentPath()}.`)
            : name;
    }

    protected getParentPath() {
        const parts: string[] = [];
        let prt = this.parent;
        while (prt != null) {
            if (prt.config && prt.config.options &&
                (prt.config.options.name ||
                    (prt.rIndex !== undefined && prt.config.name !== 'table-cell' && prt.config.name !== 'table-row')
                )
            ) {
                if (prt.rIndex !== undefined) {
                    parts.push(`[${prt.rIndex}]`);
                } else {
                    parts.push(prt.config.options.name);
                }
            }
            prt = prt.parent;
        }
        return parts.reverse().join('.').split('.[').join('[');
    }
}
