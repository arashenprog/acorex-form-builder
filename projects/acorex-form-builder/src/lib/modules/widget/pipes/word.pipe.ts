import { Pipe, PipeTransform } from '@angular/core';
import { AXFFormatService } from '../services/format.service';

@Pipe({ name: 'word' })
export class AXFWordPipe implements PipeTransform {

    constructor(private formatService: AXFFormatService) {

    }

    transform(value: string): string {
        debugger;
        return this.formatService.format(value);
    }
}