import { Output, EventEmitter, Input } from '@angular/core';

export abstract class AXFProperyEditor<T>{

    private _value: T;
    @Input()
    public get value(): T {
        return this._value;
    }
    public set value(v: T) {
        //if (v != this._value) {
            this._value = v;
            console.log("value changed",v);
            this.valueChange.emit(v);
       // }

    }


    @Output()
    valueChange: EventEmitter<T> = new EventEmitter<T>();

    handleValueChange(value: T) {
        this.value = value;
        
    }

}