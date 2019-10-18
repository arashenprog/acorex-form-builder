import { Output, EventEmitter, Input } from '@angular/core';

export abstract class AXFProperyEditor<T>{

    private _value: T;
    @Input()
    public get value(): T {
        return this._value;
    }
    public set value(v: T) {
        this._value = v;
        this.valueChange.emit(v);
    }


    @Output()
    valueChange: EventEmitter<T> = new EventEmitter<T>();

    handleValueChange(value: T) {
        this.value = value;
    }

}