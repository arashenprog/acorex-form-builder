
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AXFConnectService } from '../services/connect.service';
import { AXFDataService } from '../services/data.service';
import { AXFUrlResolverService } from '../services/url-resolver.service';

@Pipe({ name: 'resolveUrl' })
export class ResolveUrlPipe implements PipeTransform {

    constructor(private resolverService: AXFUrlResolverService) {
    }

    transform(url: string): Promise<SafeUrl> {
        return this.resolverService.resolve(url);
    }

}
