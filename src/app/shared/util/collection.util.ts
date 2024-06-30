import { Injectable } from '@angular/core';

@Injectable()
export class CollectionUtil {

  static arrayToSubArray<T>(array: T[], chunkSize: number): T[][] {

    let chunks:any = [];

    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }

    return chunks
  }


}


