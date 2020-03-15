
import { Pipe, PipeTransform} from "@angular/core";
import { Observable } from 'rxjs';
import { PromisResult } from 'acorex-ui';
import { AXFConnectService } from '../services/connect.service';

@Pipe({ name: 'resolveUrl'})
export class ResolveUrlPipe implements PipeTransform {
    observable: string;

    constructor(private connectService: AXFConnectService) {
       
    }

    transform(url: string):Promise<string> {
        if(url.includes("base64"))
        return new Promise((resolve) => { resolve(url)});
        else
        return new Promise((resolve) => { 
            this.connectService.send('resolveUrl',{url}).then((c) => {                
                resolve(c); 
            });
        }); 
    }
   
}