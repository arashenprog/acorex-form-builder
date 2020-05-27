import { Injectable, Injector } from '@angular/core';
import { AXFConnectService } from './connect.service';
import { PromisResult, EventService, IValidationRuleResult, AXRenderService } from 'acorex-ui';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { AXFValidatorProp } from '../../property-editor/editors/validation/validation.class';
// import * as memoizee_ from 'memoizee';
// const memoizee = memoizee_;
// //
// export function memoize(config?) {
//     return function (target, key, descriptor) {
//         const oldFunction = descriptor.value;
//         const newFunction = memoizee(oldFunction, config);
//         descriptor.value = function () {
//             return newFunction.apply(this, arguments);
//         };
//     };
// };

export class EventData {
    name: string;
    value?: any;
    constructor(name, value?) {
        this.name = name;
        this.value = value;
    }
}


@Injectable({ providedIn: 'root' })
export class AXFDataService {

    private dataModel: any = {};
    private widgetRegisterChangeObserver: any;
    private widgets: any = {};
    private imageUrls: any[] = [];
    private dataChangeSubject = new Subject<boolean>();

    constructor(
        private connectService: AXFConnectService,
    ) {

    }

    get onChange(): Observable<boolean> {
        return this.dataChangeSubject.asObservable();
    }

    setValue(path: string, value: any) {
        this.setPropByPath(this.dataModel, path, value);
        this.dataChangeSubject.next(this.dataModel);
    }

    callEvent(info: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connectService.send('callEvent', info).then(() => {
                resolve();
            });
        });
    }

    getValue(name: string) {
        return this.getPropByPath(this.dataModel, name);
    }


    init(): Promise<any> {
        const p1 = new Promise((resolve) => {
            this.connectService.send('getModel').then(c => {
                this.dataModel = c || {};
                resolve();
            });
        });

        // const p2 = new Promise((resolve) => {

        //     const intv = setInterval(() => {
        //         if (window['init']) {
        //             clearInterval(intv);
        //             resolve();
        //         }
        //     }, 50);
        // });

        return Promise.all([p1]);
    }

    //@memoize({ promise: true })
    getList(dataSourceName: string, params?: any): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            const keyValObject = {};
            if (Array.isArray(params)) {
                params.forEach(p => {
                    if (typeof p.value === 'string' && p.value.match(/\$([a-zA-Z1-9])+/)) {
                        keyValObject[p.name] = this.getValue(p.value.substring(1));
                    } else if (typeof p.value === 'function' && p.value().match(/\$([a-zA-Z1-9])+/)) {
                        keyValObject[p.name] = this.getValue(p.value().substring(1));
                    } else {
                        keyValObject[p.name] = p.value;
                    }
                });
            } else {
                Object.assign(keyValObject, params);
            }
            if (dataSourceName && dataSourceName.match(/\[\S+\]/)) {
                resolve(this.getPropByPath(this.dataModel, dataSourceName.substring(1, dataSourceName.length - 1)));
            } else {
                this.connectService.send('getList', { name: dataSourceName, params: keyValObject }).then(c => {
                    resolve(c.items);
                });
            }
        });
    }

    getDSList(): PromisResult<any[]> {
        const result = this.findModelList();
        return new PromisResult<any[]>((resolve) => {
            this.getList('ds-list').then(items => {
                result.push(...items);
                resolve(result);
            });
        });
    }

    getWord(key: string): string {
        return this.getPropByPath(this.dataModel, key);
    }

    getModel(): any {
        return this.dataModel;
    }



    private findModelList(): any[] {
        const result: string[] = [];
        this.findObjectList(this.dataModel, result);
        return result.map(c => ({ value: `[${c}]`, text: `[${c}]` }));
    }


    private findObjectList(obj: any, result: any[], parent?: string) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const o = obj[key];
                if (Array.isArray(o)) {
                    if (parent) {
                        result.push(parent + '.' + key);
                    } else {
                        result.push(key);
                    }
                } else if (typeof o === 'object') {
                    this.findObjectList(o, result, parent ? parent + '.' + key : key);
                }
            }
        }
    }



    private getPropByPath(obj, path, defaultVal?) {
        path = path
            .replace(/\[/g, '.')
            .replace(/]/g, '')
            .split('.');

        path.forEach((level) => {
            if (obj) {
                obj = obj[level];
            }
        });

        if (obj === undefined) {
            return defaultVal;
        }
        return obj;
    }

    private setPropByPath(obj, path, value) {
        if (Object(obj) !== obj) { return obj; } // When obj is not an object
        // If not yet an array, get the keys from the string-path
        if (!Array.isArray(path)) { path = path.toString().match(/[^.[\]]+/g) || []; }
        path.slice(0, -1).reduce((a, c, i) => // Iterate all of them except the last one
            Object(a[c]) === a[c] // Does the key exist and is its value an object?
                // Yes: then follow that path
                ? a[c]
                // No: create the key. Is the next key a potential array-index?
                : a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1]
                    ? [] // Yes: assign a new array object
                    : {}, // No: assign a new plain object
            obj)[path[path.length - 1]] = value; // Finally assign the value to the last key
        return obj; // Return the top-level object to allow chaining
    }


    validate(): Promise<void> {
        const ff = [];
        for (const key in this.widgets) {
            if (this.widgets.hasOwnProperty(key)) {
                const widget = this.widgets[key]; 
                if (widget.validator && widget.readonly != true) {
                    ff.push(widget);
                    const v: AXFValidatorProp = new AXFValidatorProp();
                    Object.assign(v, widget.validator);
                    widget.validator = v;
                    widget.validate = (): Promise<IValidationRuleResult> => {
                        debugger;
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

        return new Promise((resolve, reject) => {
            Promise.all(ff
                .map(c => c.validate()))
                .then((rules) => {
                    const failed = rules.filter((c: IValidationRuleResult) => !c.result);
                    if (failed.length) {
                        console.error(failed.map(c => c.message).join(', '));
                        reject();
                    } else {
                        resolve();
                        //                       
                    }
                });
        });
    }


    submit(html?: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.validate().then(c => {
                this.connectService.send('submit', {
                    data: this.dataModel,
                    html
                }).then(() => {
                    resolve();
                });
            });
        });
    }

    setWidget(name: string, value: any) {
        this.widgets[name] = value;
        if (!this.widgetRegisterChangeObserver) {
            Observable.create(observer => {
                this.widgetRegisterChangeObserver = observer;
            })
                .pipe(debounceTime(100))
                .pipe(distinctUntilChanged())
                .subscribe(c => {
                    for (const i in this.widgets) {
                        if (this.widgets.hasOwnProperty(i)) {
                            const w = this.widgets[i];
                            w.invokeEvent('onInit');
                        }
                    }
                });
        }
        this.widgetRegisterChangeObserver.next(name);
    }

    getWidget(name: string) {
        return this.widgets[name];
    }


    setImageUrl(data: any) {
        this.imageUrls.push(data);
    }

    getImageUrl(url: string) {
        return this.imageUrls.find(f => f.url == url);
    }
}
