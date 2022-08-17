import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {
  constructor(){}

  transform(item: any, replace:string, replacement:string): any {
    if(item == null) return "";
  //  item = item.replace(replace, replacement);
  //  return item;
     var partial = this.replaceFirstOccurrenceInString(item,replacement,replace);
     return this.replaceLastOccurrenceInString(partial,replace,replacement);
  }


   isString(variable:any) {
    return typeof (variable) === 'string';
  }

   replaceLastOccurrenceInString(input:string, find:string, replaceWith:string) {
    if (!this.isString(input) || !this.isString(find) || !this.isString(replaceWith)) {
      return input;
    }

    const lastIndex = input.lastIndexOf(find);
    if (lastIndex < 0) {
      return input;
    }

    return input.substr(0, lastIndex) + replaceWith + input.substr(lastIndex + find.length);
  }

  replaceFirstOccurrenceInString(input:string, find:string, replaceWith:string) {
    if (!this.isString(input) || !this.isString(find) || !this.isString(replaceWith)) {
      return input;
    }

    const lastIndex = input.indexOf(find);
    if (lastIndex < 0) {
      return input;
    }

    return input.substr(0, lastIndex) + replaceWith + input.substr(lastIndex + find.length);
  }
}
