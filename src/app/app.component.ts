import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

// angular material imports
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// services
import { MessageInformation, MessagingService } from '../app/app-services/messaging.service';
import { DataService, PageInformation } from './app-services/data.service';
import { GlobalsService } from './app-services/globals.service';

// enums
import { WindowCodes } from '../app/common/enum/window-codes.enum';

// third Party Services/Components/Pipes
import { Language, TranslationService, LocaleService } from 'angular-l10n';

// modals
import { AlertDialogComponent } from './common/dialog/alert-dialog/alert-dialog.component';

// other files
import { MessageCodes } from './common/enum/message-codes.enum';



@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  @Language() lang: string;
  @ViewChild(MatSidenav) sidenav: MatSidenav;


  title = 'app';

  public showNavBar: boolean = false;
  private windowOpenRequestSubscription: Subscription;
  private alertRequestSubscription: Subscription;
  private detailWindowRequestSubscription: Subscription;
  public sidebarOpened: boolean = false;

  
    

  constructor(
    public _messaging: MessagingService,
    private _router: Router,
    public localization: TranslationService,
    private locale: LocaleService,
    public dialog: MatDialog,
    public _data: DataService,
    private _globals: GlobalsService
  )
  {

  }
  
      ngOnInit(): void{
        this.windowOpenRequestSubscription = this._messaging.requestFrameOpenMessage.subscribe(message => this.openWindow(message));
        this.alertRequestSubscription = this._messaging.broadcastMessage.subscribe(message => this.showAlertDialog(message));
        

        var mess: MessageInformation = { name: "open", messageType: MessageCodes.OPEN_FRAME, details: WindowCodes.PAGE, extra: [1] };
                  this._messaging.frameOpenRequest(mess);
      }



      ngOnDestroy(): void{
        if(this.windowOpenRequestSubscription){
            this.windowOpenRequestSubscription.unsubscribe();
        }
        if(this.alertRequestSubscription){
            this.alertRequestSubscription.unsubscribe();
        }
        if(this.detailWindowRequestSubscription){
            this.detailWindowRequestSubscription.unsubscribe();
        }
      }

      private showAlertDialog(message: MessageInformation): void{
        if(message.messageType == MessageCodes.SHOW_ALERT){
          let dialogRef = this.dialog.open(AlertDialogComponent, {
            height: '400px',
            width: '600px',
            data: { titleText: this.localization.translate("UN_INFORMATION"),
            messageText: message.details,
            okText: this.localization.translate("UN_OK"),
            chosenHeight: 400,
            chosenWidth: 600}
          });
        }
            
      }

     
      

      private openWindow(message: MessageInformation): void{
          switch(message.details){
              case WindowCodes.INDEX:
                  this._router.navigate(['/index']); // here "About" is path
                  break;
              case WindowCodes.PAGE:
                  this._router.navigate(['/page', 0]);
                  break;
              case WindowCodes.SEARCH:
                    this._router.navigate(['/search']);
              break;
              case WindowCodes.HISTORY:
                if(this.sidebarOpened == true){
                    this.sidenav.close();
                    this.sidebarOpened = false;
                }
                else{
                    this.sidenav.open();
                    this.sidebarOpened = true;
                }
                    
              break;
          }
      }

}
