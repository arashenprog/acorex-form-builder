import { Injectable } from '@angular/core';
import { AXFConnectService } from './connect.service';
import { Subject, Subscription, Observable } from 'rxjs';
import { filter, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

export class EventData {
    name: string;
    value?: any;
    constructor(name, value?) {
        this.name = name;
        this.value = value;
    }
}


@Injectable({
    providedIn: "root"
})
export class AXFFormService {

    //private subject$ = new Subject();

    private widgetRegisterChangeObserver: any;

    constructor(private connectService: AXFConnectService) {
    }

    private formData: any = {};

    setValue(name: string, value: any) {
        this.formData[name] = value;
        console.log(this.formData);
    }

    getValue(name: string) {
        return this.formData[name];
    }


    submit() {
        console.log("start submit", this.formData);
        this.connectService.send("submit", { data: this.formData }).then(() => {
            console.log("submitted");
        });
    }


    private widgets: any = {};

    setWidget(name: string, value: any) {
        this.widgets[name] = value;
        if (!this.widgetRegisterChangeObserver) {
            Observable.create(observer => {
                this.widgetRegisterChangeObserver = observer;
            })
                .pipe(debounceTime(50))
                .pipe(distinctUntilChanged())
                .subscribe(c => {
                    for (const i in this.widgets) {
                        if (this.widgets.hasOwnProperty(i)) {
                            const w = this.widgets[i];
                            w.invokeEvent("onInit")
                        }
                    }
                });
        }

        this.widgetRegisterChangeObserver.next(name);
    }

    getWidget(name: string) {
        return this.widgets[name];
    }
}