import { Pipe, PipeTransform } from '@angular/core';
import { Client, clientFullName } from '../domain/client';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(client: Client): string {
    return clientFullName(client);
  }

}
