import {
    Injector,
    OnInit,
    Input,
    ViewChild,
    Component,
    ApplicationRef
} from '@angular/core';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'


import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';

// our services
import { DataService, PageInformation, PageObjectInformation } from '../../../app-services/data.service';
import { GlobalsService } from '../../../app-services/globals.service';




// our Services
import { MessagingService, MessageInformation } from '../../../app-services/messaging.service';

//enums
import { ObjectCodes } from '../../../common/enum/object-codes.enum';
import { FindValueOperator } from 'rxjs/internal/operators/find';
import { MessageCodes } from 'src/app/common/enum/message-codes.enum';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  providers: [ DataService ],
})
export class PageComponent implements OnInit {

  public liveRecords: PageInformation[] = [];
  public errorMessage: string;
  public fileName: string = "(No File Chosen)";
  public uploadDisabled: boolean = true;
  public butCol: string = "darkgray";

  private broadcastSubscription: Subscription;


  public showProgress: boolean = false;
  public showResults: boolean = false;
  public data: any[];

  
  constructor( private _data: DataService,
                private _globals: GlobalsService,
                private _messaging: MessagingService,
                private http: HttpClient ) { }

  ngOnInit() {
    this.broadcastSubscription = this._messaging.broadcastMessage.subscribe(message => this.CsvUploadFinished(message));
  }



  public file: File;
  public doFileInput($event): void{

    //const file:File = event.target.files[0];
    this.file = $event.target.files[0];

    if (this.file) {
       this.fileName = this.file.name;

        // enable upload buttons
        this.uploadDisabled  = false;
        this.butCol = "blue";
    }

  }

  public uploadFile(): void{
    let file: File = this.file;

    this._data.uploadCsv(this.file);

    this.showProgress = true;

  }

  public CsvUploadFinished(message: MessageInformation): void{
    if(message.messageType == MessageCodes.CSV_UPLOADED){
      this.showResults = true;
      this.showProgress = false;


      this.data = [];
      let jsonPObj = JSON.parse(message.extra[0]);



      this.data = jsonPObj;


    }

  }
  

  


}
