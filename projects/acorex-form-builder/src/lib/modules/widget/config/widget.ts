import { Injector, EventEmitter, Input, Output, Directive, ChangeDetectorRef, IterableDiffers, IterableDifferFactory, IterableDiffer } from '@angular/core';
import { AXFWidgetService, WidgetConfig } from '../services/widget.service';
import { AXHtmlUtil, AXToastService, IValidationRuleResult, AXValidationRule, EventService } from 'acorex-ui';
import { AXFBoxStyleValue } from '../../property-editor/editors/style/box-style/box-style.class';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AXFDataService } from '../services/data.service';
import { AXFWidgetPickerService } from '../services/template/picker.service';
import { AXFValidatorProp } from '../../property-editor/editors/validation/validation.class';
import { AXFChangeTrackerService } from '../services/change-tracker.service';

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
        this.onRender();
    }

    applyStyle(el: HTMLElement): void {
        if (el == null) {
            return;
        }
        el.style.backgroundColor = this['bgColor'];
        el.style.color = this['color'];
        el.style.textAlign = this['textAlign'];
        el.style.fontSize = this['fontSize'];
        el.style.verticalAlign = this['verticalAlign'];
        el.style.writingMode = this['textDirection'];
        if (el.style.writingMode === 'tb') {
            el.style.transform = 'rotate(180deg)';
        }

        if (this['textStyle']) {
            el.style.fontWeight = this['textStyle'].includes('bold') ? 'bold' : 'inherit';
            el.style.fontStyle = this['textStyle'].includes('italic') ? 'italic' : 'inherit';
            el.style.textDecoration = this['textStyle'].includes('underline') ? 'underline' : 'inherit';
            el.style.wordBreak = this['textStyle'].includes('break') ? 'break-all' : 'unset';
            if (this['textStyle'].includes('break'))
                el.style.width = '10px';
        }
        el.style.width = this['width'];
        el.style.height = this['height'];
        if (this['font'])
            el.style.fontFamily = this['font'];
        else
            el.style.fontFamily = 'inherit';
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
                if (boxStyle.border.top && parseInt(boxStyle.border.top) > 0)
                    el.style.borderTop = `${boxStyle.border.top}px solid`;
                if (boxStyle.border.bottom && parseInt(boxStyle.border.bottom) > 0)
                    el.style.borderBottom = `${boxStyle.border.bottom}px solid`;
                if (boxStyle.border.left && parseInt(boxStyle.border.left) > 0)
                    el.style.borderLeft = `${boxStyle.border.left}px solid`;
                if (boxStyle.border.right && parseInt(boxStyle.border.right) > 0)
                    el.style.borderRight = `${boxStyle.border.right}px solid`;
            }
            // apply margin size
            if (boxStyle.margin != null) {
                el.style.marginTop = `${boxStyle.margin.top}px`;
                el.style.marginBottom = `${boxStyle.margin.bottom}px`;
                el.style.marginLeft = `${boxStyle.margin.left}px`;
                el.style.marginRight = `${boxStyle.margin.right}px`;
            }
            if (boxStyle.borderColor)
                el.style.borderColor = boxStyle.borderColor;
            else
                el.style.borderColor = '#333';
        }
        if (this['tableLayout'] == true) {
            el.style.tableLayout = "fixed";
            el.style.width = "max-content";
        }
        if (this['minWidth'])
            el.style.minWidth = `${this['minWidth']}px`;
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

    picker2: AXFWidgetPickerService;
    toastService: AXToastService;
    private changeTracker: AXFChangeTrackerService;


    locked: boolean = false;


    constructor() {
        super();
        this.picker2 = WidgetInjector.instance.get(AXFWidgetPickerService);
        this.toastService = WidgetInjector.instance.get(AXToastService);
        this.toastService = WidgetInjector.instance.get(AXToastService);
        this.changeTracker = WidgetInjector.instance.get(AXFChangeTrackerService);
    }



    delete() {
        if (!this.locked) {
            if (this.parent && this.parent.widgets) {
                const oldValue = this.parent.widgets.slice();
                this.parent.widgets = this.parent.widgets.filter(c => c.options.uid != this.uid);
                this.changeTracker.registerChange({
                    prop: 'widgets',
                    widget: this.parent,
                    oldValue: oldValue,
                    value: this.parent.widgets
                });
                if (this.parent.refresh) {
                    this.parent.refresh();
                }
            }
            this.onDelete.emit(this);
        }
    }

    edit() {
        if (!this.locked) {
            this.onSelect.emit(this);
        }
    }

    copy() {
        sessionStorage.setItem('clipboard', this.widgetService.serialize(this.config));
        WidgetInjector.instance.get(AXToastService).success('Widget copied!');
    }
    cut() {
        if (!this.locked) {
            this.copy();
            this.delete();
        }
    }
    paste() {
        if (!this.locked) {
            const cp = sessionStorage.getItem('clipboard');
            if (cp) {
                const config = this.widgetService.parse(cp);
                if (config && this.config.container) {
                    this.addChild(config);
                    WidgetInjector.instance.get(AXToastService).success('Widget pasted!');
                }
            }
        }
    }

    addChild(widget: WidgetConfig, options?: any) {
        this.addChildAt(-1, widget, options);
    }

    addChildAt(index: number, widget: WidgetConfig, options?: any) {
        const w = this.widgetService.parse(this.widgetService.serialize(widget));
        if (!w.options) {
            w.options = {};
        }
        w.onRendered.subscribe(c => {
            if (c && (c as any).componentRef && (c as any).componentRef.edit) {
                (c as any).componentRef.edit();
            }
        });
        Object.assign(w.options, options);
        const oldValue = this.widgets.slice();
        if (index < 0) {
            this.widgets.push(w);
        } else {
            this.widgets.splice(index, 0, w);
        }
        this.changeTracker.registerChange({
            prop: 'widgets',
            widget: this,
            oldValue: oldValue,
            value: this.widgets
        });
        this.refresh();

    }

    addElement() {
        if (!this.locked) {
            this.picker2.showPicker().then(widgets => {
                if (widgets) {
                    widgets.forEach(w => {
                        this.addChild(w);
                    });
                }
            });
        }
    }

    addElementBefore() {
        if (!this.locked) {
            this.picker2.showPicker().then(widgets => {
                if (widgets) {
                    widgets.forEach(w => {
                        this.parent.addChildAt(this.findIndex(), w);
                    });
                }
            });
        }
    }
    addElementAfter() {
        if (!this.locked) {
            this.picker2.showPicker().then(widgets => {
                if (widgets) {
                    widgets.forEach(w => {
                        this.parent.addChildAt(this.findIndex() + 1, w);
                    });
                }
            });
        }
    }


    moveUp() {
        const c = this.findIndex();
        const widgets = this.parent.widgets;
        const oldValue = widgets.slice();
        if (widgets[c] == null || widgets[c - 1] == null) {
            this.toastService.error('Thi action is not possible!');
            return;
        }
        const temp = widgets[c];
        widgets[c] = widgets[c - 1];
        widgets[c - 1] = temp;
        this.changeTracker.registerChange({
            prop: 'widgets',
            widget: this.parent,
            oldValue: oldValue,
            value: widgets
        });
        this.parent.refresh();
    }

    moveDown() {
        const c = this.findIndex();
        const widgets = this.parent.widgets;
        const oldValue = widgets.slice();
        if (widgets[c] == null || widgets[c + 1] == null) {
            this.toastService.error('Thi action is not possible!');
            return;
        }
        const temp = widgets[c];
        widgets[c] = widgets[c + 1];
        widgets[c + 1] = temp;
        this.changeTracker.registerChange({
            prop: 'widgets',
            widget: this.parent,
            oldValue: oldValue,
            value: widgets
        });
        this.parent.refresh();
    }


    getContextMenu(parents: boolean = true): AXFContextMenuItem[] {
        let items: AXFContextMenuItem[] = [];
        if (!this.locked) {
            items.push(
                {
                    text: 'Select',
                    icon: 'fas fa-mouse-pointer',
                    action: 'edit',
                    separator: true,
                    widget: this
                });

            items.push({
                text: 'Add Widget Before',
                icon: 'fas fa-plus',
                action: 'addElementBefore',
                widget: this,
            });
            items.push({
                text: 'Add Widget After',
                icon: 'fas fa-plus',
                action: 'addElementAfter',
                separator: true,
                widget: this,
            });
            items.push({
                text: 'Move Widget Up',
                icon: 'fas fa-arrow-up',
                action: 'moveUp',
                widget: this,
            });
            items.push({
                text: 'Move Widget Down',
                icon: 'fas fa-arrow-down',
                action: 'moveDown',
                separator: true,
                widget: this,
            });

            if (this.config.container && this.config.droppable !== false) {
                //TODO: access denied on incognito window
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
                    text: 'Add Widget Inside',
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
        }
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
    protected eventService: EventService;

    public getPath(): string {
        if (this.config.name == 'table-row') {
        }
        if (this.config.options.name == null || this.config.options.name === '') {
            if (this['rIndex'] >= 0) {
                return this.getParentPath() ?
                    `${this.getParentPath()}[${this['rIndex']}]`
                    : null;
            }
            return this.getParentPath();
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

    public getParentPath(): string {
        const parts: string[] = [];
        let prt = this.parent;
        while (prt != null) {
            if (prt.config && prt.config.options &&
                (prt.config.options.name ||
                    (prt.rIndex !== undefined && prt.config.name !== 'table-cell' && prt.config.name !== 'table-row')
                )
            ) {
                // if (prt.rIndex !== undefined && prt.config.options.name) {
                //     parts.push(prt.config.options.name);
                //     parts.push(`[${prt.rIndex}]`);
                // } else if (prt.rIndex !== undefined) {
                //     parts.push(`[${prt.rIndex}]`);
                // } else {
                //     parts.push(prt.config.options.name);
                // }
                if (prt.config.options.name) {
                    parts.push(prt.config.options.name);
                }
                if (prt.rIndex !== undefined) {
                    parts.push(`[${prt.rIndex}]`);
                }
            }
            prt = prt.parent;
        }
        return [...new Set(parts)].reverse().join('.').split('.[').join('[');
    }

    public getName(): string {
        return this.config.options.name;
    }

    public getParentName(): string {
        return this.getPath().split('.').reverse().slice(1).reverse().join('.');
    }


    protected invokeEvent(name: string) {

        if (this[name]) {
            const action: string = this[name];
            if (action) {
                action.split(';').forEach(act => {
                    if (act === 'submit()') {
                        this.eventService.broadcast('__submit');
                        return;
                    }
                    const allWidgets = act.match(/\#\#*([a-zA-Z1-9_])+/g);
                    const allVars = act.match(/\$\$*([a-zA-Z1-9_])+/g);
                    const widgetRefs: AXFWidget[] = [];
                    let execCode = act;
                    const params = {};
                    if (allWidgets) {
                        allWidgets.forEach(w => {
                            const wname = w.substring(1).startsWith('#') ? w.substring(2) : this.resolveProperty(w.substring(1));
                            const widget = this.dataService.getWidget(wname);
                            let p = '_' + wname.split('.').join('_');
                            p = p.replace(/\[/, '').replace(/]/, '');
                            params[p] = widget;
                            widgetRefs.push(widget);
                            execCode = execCode.replace(w, '#' + p);
                        });
                    }
                    if (allVars) {
                        allVars.forEach(v => {
                            params[v] = v.substring(1).startsWith('$') ? this.dataService.getValue(v.substring(2)) : this.dataService.getValue(this.resolveProperty(v.substring(1)));
                        });
                    }
                    execCode = execCode.replace(/#/g, 'this.').replace(/\$/g, 'this.$');
                    execCode = execCode.replace(/\[/, '').replace(/]/, '');
                    new Function(`try {${execCode}} catch(e){  console.log(e); }`).call(params);
                    // widgetRefs.forEach(w => {
                    //     if (w) {
                    //         w.refresh();
                    //     }
                    // });
                });

            }
        }
    }



    public resolveProperty(name: string): any {
        if (this.getPath()) {
            if (this.config.options.name !== '' && this.config.options.name !== null) {
                return this.getPath().replace(this.config.options.name, name);
            } else {
                return `${this.getPath()}.${name}`;
            }

        } else {
            return name;
        }
    }

    constructor() {
        super();
        this.dataService = WidgetInjector.instance.get(AXFDataService);
        this.eventService = WidgetInjector.instance.get(EventService);
    }


    ngAfterViewInit() {
        this.register();
    }

    protected register() {
        if (this.getName()) {
            this.dataService.setWidget(this.getPath(), this);
        }
    }

    ngOnDestroy() {
        if (this.getPath()) {
            if (this.getName()) {
                this.dataService.removeWidget(this.getPath());
                this.dataService.setValue(this.getPath(), null);
            }
        }
    }


    // ****** api functions *******//

    public setVisible(value: boolean) {
        this.visible = value;
        this.onRender();
    }
}


export abstract class AXFValueWidgetView extends AXFWidgetView {

    readonly: boolean;
    validator: AXFValidatorProp;

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
            this.internalSetValue(v);
        }
    }

    protected internalSetValue(v: any) {
        let oldVal = this._value;
        this._value = v;
        this.valueChange.emit(v);
        const name: string = this.getPath();
        if (name) {
            //TODO: danger
            // if (this['dataContext'] && this.getName() && typeof (v) !== 'object') {
            //     debugger;
            //     const vv = {};
            //     vv[this.getName()] = v;
            //     Object.assign(this['dataContext'], vv);
            //     this.dataService.setValue(this.getParentName(), this['dataContext']);
            // }
            // else {
            //     this.dataService.setValue(name, v);
            // }
            //
            this.dataService.setValue(name, v);
            const info = {
                config: { componentName: this.config['name'], name: this.config.options['name'], tag: this.config.options['tag'] },
                eventName: 'valueChange',
                value: { newValue: this._value, oldValue: oldVal }
            };
            this.dataService.callEvent(info);
        }
        if (this.validator && this.validator.clear) {
            this.validator.clear();
        }
        const check = () => {
            let loaded = this['__meta__'] ? this['__meta__'].pageLoaded : false;
            //console.log(new Date());
            if (loaded) {
                this.invokeEvent('onValueChange');
                this.cdr.markForCheck();
                this.cdr.detectChanges();
            }
            else {
                setTimeout(check, 50);
            }
        }
        setTimeout(check, 50);

        this.cdr.markForCheck();
        this.cdr.detectChanges();
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

    setValue(value: any) {
        debugger;
        this.value = value;
    }

    setRequired(value: boolean) {
        if (!this.validator) {
            this.validator = new AXFValidatorProp();
        }
        this.validator.items = this.validator.items.filter(c => c.type !== 'required');
        if (value) {
            const rule1 = new AXValidationRule();
            rule1.type = 'required';
            rule1.message = 'Required';
            this.validator.items.push(rule1);
        }
        if (this.validator.clear) {
            this.validator.clear();
        }
    }


}



export abstract class AXFWidgetPrint extends AXFWidgetView {
    constructor() {
        super();
    }
    value: any;
    visible: boolean;

    protected extractValue(): any {
        if (this.getPath()) {
            return this.dataService.getValue(this.getPath());
        }
        return null;
    }

    ngAfterViewInit() {
        if (this.getPath()) {
            this.value = this.extractValue();
        }

        super.ngAfterViewInit();
    }

    ngOnDestroy() {

    }
}
