import { Pipe } from '@angular/core';
/**
 * pipe to convert the \r\n into <br />
 */
@Pipe({ name: 'min' })
export class minToHour {
    transform(value: number): string {
        if (value < 60){
          return value + "min"
        }
        if(value % 60 == 0){
        return value / 60 + "h"
        }
        return (value / 60).toFixed(1).slice(0,1)+ "h" + value % 60 + "min"
      }
}
