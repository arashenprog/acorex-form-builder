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
                const pipe = parts[i].trim();
                if (this[pipe]) {
                    result.formetters.push(pipe);
                }
            }
        }
        return result;
    }


    // public format(value: any, useModel: boolean = true, dataContext?: any): string {
    //     if (value && typeof value === 'string') {
    //         const list = value.match(/\[(.*?)\]/g);
    //         if (list) {
    //             list.forEach(w => {
    //                 const ww: AXFWordWithPipe = this.decompose(w.substring(1, w.length - 1));
    //                 let word = ww.word;
    //                 if (dataContext && typeof dataContext === 'object') {
    //                     word = dataContext[ww.word];
    //                 } else if (dataContext && typeof dataContext === 'string') {
    //                     word = this.dataService.getValue(dataContext);
    //                 } else if (useModel) {
    //                     word = this.dataService.getWord(ww.word);
    //                 }
    //                 if (word) {
    //                     for (let i = 0; i < ww.formetters.length; i++) {
    //                         const pipe = ww.formetters[i];
    //                         word = this[pipe](word);
    //                     }
    //                 }
    //                 value = value.replace(w, word);
    //             });
    //         }
    //     }
    //     return value && (value !== 'undefined') ? value : '';
    // }

    public format(value: any, widget?: AXFWidgetView): string {
        if (value && typeof value === 'string') {
            const list = value.match(/\[(.*?)\]/g);
            if (list) {
                list.forEach(w => {
                    const ww: AXFWordWithPipe = this.decompose(w.substring(1, w.length - 1));
                    let word = ww.word;
                    if (widget) {
                        if (word.startsWith('$')) {
                            word = this.dataService.getValue(widget.resolveProperty(word.substring(1)));
                        } else if (widget.config.dataContext) {
                            word = widget.config.dataContext[ww.word];
                        } else {
                            word = this.dataService.getWord(word);
                        }
                    } else {
                        word = this.dataService.getWord(word);
                    }
                    if (word) {
                        for (let i = 0; i < ww.formetters.length; i++) {
                            const pipe = ww.formetters[i];
                            word = this[pipe](word);
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
}