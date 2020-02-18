import { Pipe, PipeTransform } from '@angular/core';
import { AXFFormatService } from '../services/format.service';

@Pipe({ name: 'di' })
export class AXFDataItemPipe implements PipeTransform {

    constructor(private formatService: AXFFormatService) {

    }

    transform(dataItem: any, fieldName: string): string {
        const field = this.formatService.decompose(fieldName);
        if (field.word) {
            let val = dataItem[field.word];
            return this.formatService.format(`[${val} | ${field.formetters.join('|')}]`, false);
        }
        return fieldName;
    }
}