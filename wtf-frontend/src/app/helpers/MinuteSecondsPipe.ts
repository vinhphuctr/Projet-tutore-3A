import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'minuteSeconds'
})
export class MinuteSecondsPipe implements PipeTransform {
  transform(num: any): any {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}:${minutes}`;   
  }
}
