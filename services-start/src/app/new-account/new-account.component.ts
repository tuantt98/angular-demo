import { Component} from '@angular/core';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
})
export class NewAccountComponent {
  constructor(private accountService: AccountService) {
    this.accountService.statusUpdated.subscribe(
      status => alert('New Status: ' + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    if(!accountName) {
      alert("Please enter a name");
      return;
    }
    this.accountService.addAccount(accountName, accountStatus);
  }
}
