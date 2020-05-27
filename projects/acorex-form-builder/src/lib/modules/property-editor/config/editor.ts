import { Output, EventEmitter, Input, Directive } from '@angular/core';



@Directive()
export abstract class AXFProperyEditor<T>{


    locked: boolean = false;

    @Output()
    valueChange: EventEmitter<T> = new EventEmitter<T>();

    private _value: T;
    @Input()
    public get value(): T {
        return this._value;
    }
    public set value(v: T) {
        this._value = v;
        this.valueChange.emit(v);
    }

    constructor() {
    }

    handleValueChange(v: T) {
        this.value = v;
    }
}