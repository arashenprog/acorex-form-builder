import { Injectable } from '@angular/core';
import { AXDateTime } from 'acorex-ui';
import { AXFDataService } from './data.service';
import { AXFWidget, AXFWidgetView } from '../config/widget';

export interface AXFWordWithPipe {
    word: string;
    formetters: string[];
}


@Injectable({ providedIn: 'root' })
export class AXFFormatService {
    constructor(private dataService: AXFDataService) { }


    public decompose(value: string): AXFWordWithPipe {
        const result: AXFWordWithPipe = { word: value ? value.toString() : null, formetters: [] };
        if (value && typeof value === 'string') {
            const parts = value.split('|');
            result.word = parts[0].trim();
            for (let i = 1; i < parts.length; i++) {
                const pipe = parts[i];
                if (this[pipe.split(':')[0].trim()]) {
                    result.formetters.push(pipe);
                }
            }
        }
        return result;
    }

    public format(value: any, widget?: AXFWidgetView): string {

        if (value && typeof value === 'string') {
            const expr = value.match(/\[\#(.*?)\.formula\.(.*?)\((.*?)\)\]/);
            if (expr) {
                const wname = expr[1];
                const methodName = expr[2];
                const params = expr[3] ? expr[3].split(',').map(c => eval(c)) : [];
                widget = this.dataService.getWidget(wname);
                return widget['formula'][methodName](...params);
            }
            // const funcs = value.match(/\[(join|sum)\((.*?)\)\]/g);
            // if (funcs) {
            //     funcs.forEach(f => {
            //         const funcName = f.substring(1, f.indexOf('('));
            //         const params = f.substring(f.indexOf('(') + 1, f.length - 2).split(',');
            //         this[funcName](...params);
            //         debugger;
            //     });
            //     return;
            // }
            const list = value.match(/\[(.*?)\]/g);
            if (list) {
                list.forEach(w => {
                    const ww: AXFWordWithPipe = this.decompose(w.substring(1, w.length - 1));
                    let word: any = ww.word;
                    if (widget) {
                        if (word.startsWith('$')) {
                            word = this.dataService.getValue(widget.resolveProperty(word.substring(1)));
                        }
                        else if (widget.config.dataContext) {
                            word = widget.config.dataContext[ww.word];
                        } else {
                            word = this.dataService.getWord(word);
                        }
                    } else {
                        word = this.dataService.getWord(word);
                    }
                    if (word) {
                        if (ww.formetters.length > 0) {
                            for (let i = 0; i < ww.formetters.length; i++) {
                                const pipeParts = ww.formetters[i].split(':');
                                const pipe = pipeParts[0].trim();
                                const pipeParams = pipeParts.slice(1);
                                word = this[pipe](word, pipeParams);
                            }
                        }

                    }
                    value = value.replace(w, word || '');
                });
            }
        }
        return value || '';
    }


    private JDT(value: string) {
        try {
            const val = new AXDateTime(value, 'jalali');
            return val.format('YYYY/MM/DD');
        } catch (error) {
            return value;
        }
    }

    private number(value: string) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    private array(values: any[], params) {
        if (!Array.isArray(params) || params.length === 0) {
            return values.toString();
        }
        if (params.length === 1) {
            return values.map(c => c != null && c[params[0]]).join(', ');
        }
        if (params.length === 2) {
            const f = eval(`(x) => x!=null && x.${params[0]} `);
            return values.filter(f).map(c => c[params[1]]).join(', ');
        }
        if (params.length === 3) {
            const f = eval(`(x) =>  x!=null && x.${params[0]} `);
            return values.filter(f).map(c => c[params[1]]).join(params[2]);
        }
    }
}