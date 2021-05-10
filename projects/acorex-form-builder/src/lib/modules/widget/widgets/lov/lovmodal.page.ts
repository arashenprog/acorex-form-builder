import { Component, ViewChild, Output, EventEmitter, Input, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AXBasePageComponent } from 'acorex-ui';
import { AXFDataSourceOption } from '../../../property-editor/editors/data-source/data-source.class';
import { AXFUrlResolverService } from '../../services/url-resolver.service'; 
import { LovDataSource } from './LovDataSource';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { AXFDataService } from '../../services/data.service';
import { AXFWidgetView } from '../../config/widget';
import { AXFLovInputWidgetView } from './view/lov-input-widget.view'; 

@Component({
    styleUrls: ['./lovmodal.page.scss'],
    templateUrl: './lovmodal.page.html' 
})

export class LovModalPage extends AXBasePageComponent {
     
    constructor(private dataService: AXFDataService) {
        super(); 
        
    }
    columnCount:number=0;
    filter:string="";
    vals:any[]=[];
    // @Input()
    // public value: string;

    // @Input()
    // public infoSource: AXFDataSourceOption;
      
    @Input()
    public ww: AXFLovInputWidgetView;

    dataSource: LovDataSource;

    ngOnInit() {   
        this.columnCount=this.ww.dataSource.columns.length; 
        if(this.ww.value)
            this.vals=this.ww.value;
    }

    onChange(e)
    {
        let fltr:string=null;
        if(this.filter!=e)
            this.vals=[];
        if(e!="")
        { 
            fltr=e;
            this.filter=e;
        }    
        
        this.dataSource = new LovDataSource(this.dataService,this.ww.dataSource,this.ww,fltr);
    }


    selectItem(item)
    {
        if(this.ww.mode=="single")
            this.close(item);
        else
        { 
            let colBase=this.ww.dataSource.columns[0].fieldName;
            let ind= this.vals.findIndex(w=>w[colBase]==item[colBase]);
            if(ind>-1)
            {
                this.vals.splice(ind,1);
            }
            else
                this.vals.push(item);
        } 
    } 

    showChecked(item)
    {
        return this.vals.some(w=>w[this.ww.dataSource.columns[0].fieldName]==item[this.ww.dataSource.columns[0].fieldName])
        
    } 

    submit()
    {
        this.close(this.vals);
    }
}