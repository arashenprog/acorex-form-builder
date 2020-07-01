import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';

export interface AXFChangeSet {
    widget: any;
    prop: string;
    oldValue: any;
    value: any;
}


@Injectable({ providedIn: 'root' })
export class AXFChangeTrackerService {
    private changes: AXFChangeSet[] = [];
    private index: number = -1;

    private isTracking: boolean = true;

    private changesSubject = new Subject<AXFChangeSet>();

    get onChange(): Observable<AXFChangeSet> {
        return this.changesSubject.asObservable();
    }

    constructor() {
    }


    public registerChange(c: AXFChangeSet) {
        if (this.isTracking) {
            let detectChange = false;
            if (Array.isArray(c.value)) {
                detectChange = c.value !== c.oldValue;
            } else if (typeof c.value === 'object') {
                detectChange = JSON.stringify(c.value) !== JSON.stringify(c.oldValue);
            } else if (c.value !== c.oldValue) {
                detectChange = true;
            }
            //
            if (detectChange) {
                if (this.index === this.changes.length - 1) {
                    this.changes.push(c);
                } else {
                    this.changes = this.changes.slice(0, this.index);
                    this.changes.push(c);
                }
                this.index = this.changes.length - 1;
            }
        }
    }


    public get canUndo() {
        return this.index >= 0;
    }

    public get canRedo() {
        return (this.index < this.changes.length - 1);
    }

    public startTrack() {
        this.isTracking = true;
    }

    public stopTrack() {
        this.isTracking = false;
    }


    public undo() {
        const change = this.changes[this.index];
        if (change) {
            change.widget.config.options[change.prop] = change.oldValue;
            change.widget.refresh();
            this.changesSubject.next({
                widget: change.widget,
                prop: change.prop,
                value: change.oldValue,
                oldValue: null
            });
            this.index--;
        }
    }

    public redo() {
        const change = this.changes[this.index + 1];
        if (change) {
            change.widget.config.options[change.prop] = change.value;
            change.widget.refresh();
            this.changesSubject.next({
                widget: change.widget,
                prop: change.prop,
                value: change.value,
                oldValue: null
            });
            this.index++;
        }
    }
}