
import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues  } from 'lightning/uiObjectInfoApi';
import CASE_OBJECT from '@salesforce/schema/Case';
import STATUS_FIELD from '@salesforce/schema/Case.Status';
import TYPE_FIELD from '@salesforce/schema/Case.Type';
import getAllAccounts from '@salesforce/apex/CaseFilterController.getAllAccounts';
//import getColonWrapForInit from '@salesforce/apex/WrapperCase.getColonWrapForInit';


export default class CaseFilter extends LightningElement {
    caseStatus = '';
    accName ='';
    caseType = '';
    subjectCase = '';

    @wire(getAllAccounts) accountName;

    @wire(getObjectInfo, { objectApiName: CASE_OBJECT })
    caseHandlerData ({data,error}) {
        if(data) {
            this.defaultRecordTypeId = data.defaultRecordTypeId;
            console.log('RecorTupeID  ' + data.defaultRecordTypeId);
        } if(error) {
            this.error = error;
            console.log('some error ' + error);
        }
    }
    defaultRecordTypeId;

    @wire(getPicklistValues,
        {
            recordTypeId: '$defaultRecordTypeId',
            fieldApiName: TYPE_FIELD
        }
    )
    typePicklist;

    @wire(getPicklistValues,
       {
           recordTypeId: '$defaultRecordTypeId',
           fieldApiName: STATUS_FIELD
       }
    )
    statusPicklist;

    selectChange(event) {
        const name = event.target.name;
        if (name ==='status') {
            this.caseStatus = event.target.value;
        } else if (name === 'account') {
            this.accName = event.target.value;
        } else if (name === 'type') {
            this.caseType = event.target.value;
        } else if (name === 'enter-subject') {
            this.subjectCase = event.target.value;
        }

        console.log(this.caseStatus);
        console.log(this.accName);
        console.log(this.caseType);
        console.log(this.subjectCase);

        const selectedEvent = new CustomEvent('selected', {
            detail:{
                status: this.caseStatus,
                type: this.caseType,
                name: this.accName,
                subject: this.subjectCase
            }
        });
        this.dispatchEvent(selectedEvent);
    }
}