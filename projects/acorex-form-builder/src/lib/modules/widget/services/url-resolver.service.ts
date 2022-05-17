import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AXFConnectService } from './connect.service';
import { AXFDataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class AXFUrlResolverService {

    constructor(private connectService: AXFConnectService, private dataService: AXFDataService, private sanitized: DomSanitizer) {
    }

    resolve(url: string): Promise<SafeUrl> {
        if (url.includes('base64') || url === undefined || url.startsWith('[')) {
            return new Promise((resolve) => { resolve(this.sanitized.bypassSecurityTrustUrl(url)); });
        }
        else if(url.startsWith("http"))
            return new Promise((resolve) => { resolve(url); });
        else {
            const savedUrl = this.dataService.getImageUrl(url);
            if (savedUrl && savedUrl != null) {
                return new Promise((resolve) => { resolve(savedUrl.data); });
            } else {
                return new Promise((resolve) => {
                    this.connectService.send('resolveUrl', { url }).then((c) => {
                        const img = this.sanitized.bypassSecurityTrustUrl(c);
                        const param: any = { url, data: img };
                        this.dataService.setImageUrl(param);
                        resolve(img);
                    });
                });
            }
        }

    }
}