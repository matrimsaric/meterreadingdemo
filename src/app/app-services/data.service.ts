import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestOptions, Headers} from '@angular/http';

import { ObjectCodes } from '../common/enum/object-codes.enum';

import { MessagingService, MessageInformation } from '../app-services/messaging.service';
import { MessageCodes } from '../common/enum/message-codes.enum';
import { WindowCodes } from '../common/enum/window-codes.enum';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json' , 
        'withCredentials': 'true'
    })  
};

export class PageInformation{
    constructor(    public chapter: string, 
                    public major: number, 
                    public minor: number, 
                    public titleText: string,
                    public pageData: PageObjectInformation[]){

    }
}

export class PageObjectInformation{
    constructor(    public objectType: ObjectCodes,
                    public objectData: string,
                    public imageLocation: string,
                    public objectMetaData: string){}
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

    constructor(private _http: HttpClient, public _messaging: MessagingService) {

    }

    public uploadCsv(csvFile: any): void{
        var url = 'http://localhost:62629/api/File';

        this._http.post(url, csvFile).subscribe(
            (response) => {
                var mess: MessageInformation = { name: "csvUploaded", messageType: MessageCodes.CSV_UPLOADED, details: null, extra: [response] };
                    this._messaging.broadcastShout(mess);
            },
            (error) => {

            }
        );
    }





    

    

}
