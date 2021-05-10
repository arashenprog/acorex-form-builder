import { CollectionViewer, DataSource } from '@angular/cdk/collections'; 
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AXFDataSourceOption, AXFDataSourceRemoteParamOption } from '../../../property-editor/editors/data-source/data-source.class';
import { AXFWidgetView } from '../../config/widget';
import { AXFDataService } from '../../services/data.service';

export class LovDataSource extends DataSource<any> {
    private cachedFacts = Array.from<any>({ length: 0 });
    private dataStream = new BehaviorSubject<(any)[]>(this.cachedFacts);
    private subscription = new Subscription();

    private pageSize = 10;
    private lastPage = 0;

    constructor(private dataService: AXFDataService, private info: AXFDataSourceOption, private ww: AXFWidgetView,
        private filter:string=null) {
        super();

        // Start with some data.
       this._fetchFactPage();
    }

    connect(collectionViewer: CollectionViewer): Observable<(any | undefined)[] | ReadonlyArray<any | undefined>>  {
        this.subscription.add(collectionViewer.viewChange.subscribe(range => {
            
            
                    
          const currentPage = this._getPageForIndex(range.end);
    
          if (currentPage && range) {
            console.log(currentPage, this.lastPage);
          }
    
          if (currentPage > this.lastPage) {
            this.lastPage = currentPage;
            this._fetchFactPage();
          }
        
        }));
        return this.dataStream;
    } 
     

    disconnect(collectionViewer: CollectionViewer): void {
        this.subscription.unsubscribe();
    } 

    private _fetchFactPage()  { 
        if (this.info.mode === 'remote') {
            let params = [];
            Object.assign(params, this.info.dataSource.params);
            params.forEach(p => {
                if (typeof (p.value) === 'string' && p.value.startsWith('$')) {
                    p.value = this.ww.resolveProperty(p.value);
                }
            });
            params.push(new AXFDataSourceRemoteParamOption("PageSize", this.pageSize));
            params.push(new AXFDataSourceRemoteParamOption("PageIndex", this.lastPage));
            params.push(new AXFDataSourceRemoteParamOption("Filter", this.filter));
            this.dataService.getList(this.info.dataSource.name, params).then(items => {
                if (items && items.length) {
                    setTimeout(() => {
                        this.cachedFacts = this.cachedFacts.concat(items);
                    this.dataStream.next(this.cachedFacts);
                }, 300);   
                }
            });
        } 
    } 

    private _getPageForIndex(i: number): number {
        return Math.floor(i / this.pageSize);
    }

}