import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// third Party Services/Components/Pipes
import { Language, TranslationService, LocaleService } from 'angular-l10n';

// our Services
import { MessagingService, MessageInformation } from '../../../app-services/messaging.service';

// enums
import { MessageCodes } from '../../enum/message-codes.enum';
import { WindowCodes } from '../../enum/window-codes.enum';

@Component({
  selector: 'hdr-nav',
  templateUrl: './hdr-nav.component.html',
  styleUrls: ['./hdr-nav.component.css']
})
export class HdrNavComponent {

    @Language() lang: string;
    public showSideNav: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(
                private breakpointObserver: BreakpointObserver,
                public localization: TranslationService,
                private locale: LocaleService,
                public _messaging: MessagingService) {}
  

      public buttonClicked(name: string): void{
          switch(name){
              case "INDEX":
                  var mess: MessageInformation = { name: "open", messageType: MessageCodes.OPEN_FRAME, details: WindowCodes.INDEX, extra: [] };
                    this._messaging.frameOpenRequest(mess);
              break;
              case "PAGE":
                    // TODO NOTe that no page can be directly accessed from the menu bar
                    // in this fashion this is just to check the routes are working
                  var mess: MessageInformation = { name: "open", messageType: MessageCodes.OPEN_FRAME, details: WindowCodes.PAGE, extra: [1] };
                  this._messaging.frameOpenRequest(mess);
              break;
              case "SEARCH":
                  var mess: MessageInformation = { name: "open", messageType: MessageCodes.OPEN_FRAME, details: WindowCodes.SEARCH, extra: [] };
                  this._messaging.frameOpenRequest(mess);
              break;
              case "HISTORY":
                  var mess: MessageInformation = { name: "open", messageType: MessageCodes.OPEN_FRAME, details: WindowCodes.HISTORY, extra: [] };
                  this._messaging.frameOpenRequest(mess);
              break;
          }
      }
  }
