import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml'
})
export class StripHtmlPipe implements PipeTransform {

  transform(noteContent: any): string {
    if(!noteContent || noteContent.length === 0) return "";
    return noteContent.replace(/<[^>]*>/g, '');
  }
}
