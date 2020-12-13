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
            for (let i = 0; i < field.formetters.length; i++) {
                const pipeParts = field.formetters[i].split(':');
                const pipe = pipeParts[0].trim();
                const pipeParams = pipeParts.slice(1);
                val = this.formatService[pipe](val, pipeParams);
            }
            return val;
        }
        return fieldName;
    }
}