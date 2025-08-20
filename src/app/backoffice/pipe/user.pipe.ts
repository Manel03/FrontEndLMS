import { Pipe, PipeTransform } from '@angular/core';
import { UserManagementService } from '../service/user-management.service';
import { map, Observable, shareReplay } from 'rxjs';

@Pipe({
  name: 'user',
  pure: true // maintenant c'est un pipe pur
})
export class UserPipe implements PipeTransform {
  private cache: { [userId: string]: Observable<string> } = {};

  constructor(private userService: UserManagementService) {}

  transform(userId: string): Observable<string> {
    if (!this.cache[userId]) {
      this.cache[userId] = this.userService.getUserById(userId).pipe(
        map(user => user.firstName + ' ' + user.lastName),
        shareReplay(1) // évite les requêtes multiples
      );
    }
    return this.cache[userId];
  }
}
