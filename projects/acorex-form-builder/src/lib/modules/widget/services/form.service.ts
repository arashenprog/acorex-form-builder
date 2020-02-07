import { Injectable } from '@angular/core';
import { AXFConnectService } from './connect.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { EventService, IValidationRuleResult } from 'acorex-ui';
import { AXFValidatorProp } from '../../property-editor/editors/validation/validation.class';

export class EventData {
    name: string;
    value?: any;
    constructor(name, value?) {
        this.name = name;
        this.value = value;
    }
}


@Injectable({
    providedIn: 'root'
})
export class AXFFormService {

    constructor(private connectService: AXFConnectService, private eventService: EventService) {
        eventService.on('__submit', (data) => {
            this.submit();
        });
    }

    private widgetRegisterChangeObserver: any;

    private formData: any = {};


    private widgets: any = {};

    setValue(name: string, value: any) {
        this.formData[name] = value;
        console.log(this.formData);
    }

    getValue(name: string) {
        return this.formData[name];
    }


    submit() {
        const ff = [];
        for (const key in this.widgets) {
            if (this.widgets.hasOwnProperty(key)) {
                const widget = this.widgets[key];
                if (widget.validator) {
                    ff.push(widget);
                    const v: AXFValidatorProp = new AXFValidatorProp();
                    Object.assign(v, widget.validator);
                    widget.validator = v;
                    widget.validate = (): Promise<IValidationRuleResult> => {
                        return new Promise<IValidationRuleResult>(resolve => {
                            widget.validator.validate(widget.value).then(r => {
                                r.target = widget;
                                const elm: HTMLDivElement = widget._rootElement;
                                elm.classList.remove('axf-validation-error');
                                const exists = elm.querySelector('.error-text');
                                if (exists) {
                                    elm.removeChild(exists);
                                }
                                if (!r.result) {
                                    elm.classList.add('axf-validation-error');
                                    const errorElm = document.createElement('div');
                                    errorElm.classList.add('error-text');
                                    errorElm.innerHTML = r.message;
                                    elm.appendChild(errorElm);
                                }
                                resolve(r);
                            });
                        });
                    };
                }
            }
        }

        Promise.all(ff
            .map(c => c.validate()))
            .then((rules) => {
                const failed = rules.filter((c: IValidationRuleResult) => !c.result);
                if (failed.length) {
                    console.error(failed.map(c => c.message).join(', '));
                } else {
                    this.connectService.send('submit', { data: this.formData }).then(() => {
                    });
                }
            });
    }

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
