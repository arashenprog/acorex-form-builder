import { Output, EventEmitter, Input, Directive, ChangeDetectorRef } from '@angular/core';



@Directive()
export abstract class AXFProperyEditor<T>{


    locked: boolean = false;
    initiated: boolean = false;

    @Output()
    valueChange: EventEmitter<T> = new EventEmitter<T>();

    private _value: T;
    @Input()
    public get value(): T {
        return this._value;
    }
    public set value(v: T) {
        // let newValue: any;
        // if (Array.isArray(v)) {
        //     newValue = v.slice();
        // } else if (typeof v === 'object') {
        //     newValue = JSON.parse(JSON.stringify(v));
        // } else {
        //     newValue = v;
        // }
        // this.cdr.markForCheck();
        // this._value = newValue;
        // this.valueChange.emit(newValue);
        this._value = v;
        this.valueChange.emit(v);
        this.cdr.markForCheck();
        this.cdr.detectChanges();
    }

    constructor(protected cdr: ChangeDetectorRef) {
    }

    handleValueChange(v: T) {
        this.value = v;
    }
}