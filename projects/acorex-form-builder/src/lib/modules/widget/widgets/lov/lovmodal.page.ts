import { Component, ViewChild, Output, EventEmitter, Input, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';
import { AXFDataSourceOption } from '../../../property-editor/editors/data-source/data-source.class';
import { AXFUrlResolverService } from '../../services/url-resolver.service'; 
import { LovDataSource } from './LovDataSource';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { AXFDataService } from '../../services/data.service';
import { AXFWidgetView } from '../../config/widget';
//import { setTimeout } from 'timers';
@Component({
    styleUrls: ['./lovmodal.page.scss'],
    templateUrl: './lovmodal.page.html',
    //changeDetection: ChangeDetectionStrategy.OnPush
})

export class LovModalPage extends AXBasePageComponent {
     
    constructor(protected cdr: ChangeDetectorRef,private resolveService: AXFUrlResolverService,private dataService: AXFDataService) {
        super(); 
        
    }

    filter:string="";

    @Input()
    public value: string;

    @Input()
    public infoSource: AXFDataSourceOption;
      
    @Input()
    public ww: AXFWidgetView;

    dataSource: LovDataSource;

    ngOnInit() {  
    }

    onChange(e)
    {debugger
        let fltr:string=null;
        if(e!="")
        fltr=e;
        this.dataSource = new LovDataSource(this.dataService,this.infoSource,this.ww,fltr);
    }
}