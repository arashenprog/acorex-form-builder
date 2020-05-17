
import { Pipe, PipeTransform} from "@angular/core";
import { Observable } from 'rxjs';
import { PromisResult } from 'acorex-ui';
import { AXFConnectService } from '../services/connect.service';
import { AXFDataService } from '../services/data.service';

@Pipe({ name: 'resolveUrl'})
export class ResolveUrlPipe implements PipeTransform {
    observable: string;

    constructor(private connectService: AXFConnectService,private dataService: AXFDataService) { 
    }

    transform(url: string):Promise<string> { 
        if(url.includes("base64") || url==undefined)
        return new Promise((resolve) => { resolve(url)});
        else
        {
            let savedUrl=this.dataService.getImageUrl(url)
            if(savedUrl && savedUrl!=null)
              return new Promise((resolve) => { resolve(savedUrl.data)});
            else
                return new Promise((resolve) => { 
                    this.connectService.send('resolveUrl',{url}).then((c) => { 
                        let param:any={url:url,data:c};
                        this.dataService.setImageUrl(param);               
                        resolve(c); 
                    });
                }); 
        }
        
    }
   
}