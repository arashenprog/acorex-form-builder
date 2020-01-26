import { Pipe, PipeTransform } from '@angular/core';
import { AXFDataService } from '../services/data.service';
import { AXDateTime } from 'acorex-ui';

@Pipe({ name: 'word' })
export class AXFWordPipe implements PipeTransform {

    constructor(private dataService: AXFDataService) {

    }

    transform(value: string): string {

        if (value && typeof value == "string") {
            const list = value.match(/\[.+\]/g);
            if (list) {
                list.forEach(w => {
                    const parts = w.substring(1, w.length - 1).split('|');
                    const orgWord = parts[0].trim();
                    let word = this.dataService.getWord(orgWord);
                    if (word) {
                        for (let i = 1; i < parts.length; i++) {
                            const pipe = parts[i].trim();
                            if (this[pipe])
                                word = this[pipe](word);
                        }

                    }
                    value = value.replace(w, word);
                });
            }
        }
        return value
    }


    private JDT(value: string) {
        try {
            const val = new AXDateTime(value, "jalali");
            return val.toString();
        } catch (error) {
            return value;
        }
    }

    private number(value: string) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}