import { Pipe, PipeTransform } from '@angular/core';
import { AXFDataService } from '../services/data.service';

@Pipe({ name: 'word' })
export class AXFWordPipe implements PipeTransform {

    constructor(private dataService: AXFDataService) {

    }

    transform(value: string): string {
        if (value) {
            let list = value.match(/\[\S+\]/g);
            if (list) {
                list.forEach(w => {
                    let word = this.dataService.getWord(w.substring(1, w.length - 1));
                    if (word)
                        value = value.replace(w, word);
                });
            }
        }
        return value
    }
}