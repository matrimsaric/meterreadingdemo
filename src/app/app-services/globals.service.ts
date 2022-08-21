import { Injectable } from '@angular/core';


import { PageInformation, PageObjectInformation } from './data.service';

//enums
import { ObjectCodes } from '../common/enum/object-codes.enum';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  
  constructor() { }

  public loadData(incomingData: any, chapt: string, 
    major: number, minor: number): PageInformation[]{

    var liveRecords: PageInformation[] = [];

    var savedTitle: string = "";
    var lastRec: any;

    var recs: PageObjectInformation[] = [];
    for(var idx: number = 0; idx < incomingData.length; idx++){
        lastRec = incomingData[idx];
        var masterCode: ObjectCodes = ObjectCodes.TEXT;

        if(savedTitle == ""){
            savedTitle = incomingData[idx].Title;
        }
        else if(savedTitle != incomingData[idx].Title)
        {
            var hdrBlock:  PageInformation = {
                chapter: incomingData[idx].Chapter,
                major: incomingData[idx].MajorId,
                minor: incomingData[idx].MinorId,
                titleText: savedTitle,
                pageData: recs
            };
            liveRecords.push(hdrBlock);

            recs = [];// clear for new child records
            savedTitle = incomingData[idx].Title;// ensure new title is live
        }


        switch(incomingData[idx].ObjectType){
            case 1:
                masterCode = ObjectCodes.LINK;
            break;
            case 2:
                masterCode = ObjectCodes.IMAGE;
            break;
            case 3:
                masterCode = ObjectCodes.BREAK;
               break;
        }
        var obj: PageObjectInformation = {
            objectType: masterCode, objectData: incomingData[idx].DataText, imageLocation: incomingData[idx].ImageLink, objectMetaData: incomingData[idx].MetaData
        };
        recs.push(obj);

    }

    if(recs && recs.length > 0){
        var hdrBlock:  PageInformation = {
            chapter: lastRec.Chapter,
            major: lastRec.MajorId,
            minor: lastRec.MinorId,
            titleText: savedTitle,
            pageData: recs
        };
        liveRecords.push(hdrBlock);
    }
    
    return liveRecords;
  }



}
