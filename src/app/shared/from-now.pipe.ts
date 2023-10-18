import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fromNow',
})
export class FromNowPipe implements PipeTransform {
  transform(firebaseDate: any, ...args: any[]): string {
    const convertDate = new Date(
      firebaseDate.seconds * 1000 + firebaseDate.nanoseconds / 1000000
    );
    return moment(convertDate).fromNow();
  }
}
