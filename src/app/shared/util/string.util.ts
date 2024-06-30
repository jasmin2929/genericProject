import { Injectable } from '@angular/core';

@Injectable()
export class StringUtil {

  static underlineToCamelCase(string:string) {
    return string.toLowerCase().replace(/(\_[a-z])/g, function(match) {
      return match.toUpperCase().replace("_", "");
    });
  }
  
}


