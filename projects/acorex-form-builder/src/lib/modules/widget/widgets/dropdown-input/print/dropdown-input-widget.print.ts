import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AXFWidgetPrint } from '../../../config/widget';
import { AXFDataSourceOption } from '../../../../property-editor/editors/data-source/data-source.class';

@Component({
    templateUrl: './dropdown-input-widget.print.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AXFDropdownInputWidgetPrint extends AXFWidgetPrint {

    dataSource: AXFDataSourceOption;
    constructor() {
        super();
    }

}
