
import { LightningElement, api, wire } from 'lwc';
import casesSearch from '@salesforce/apex/SearchResultController.casesSearch';

export default class SearchCaseTab extends LightningElement {
    @api caseList;

    status;
    accountName;
    caseType ;
    subjectCase ;

    selectedHandler(event){
        this.status = event.detail.status;
        this.accountName = event.detail.name;
        this.caseType = event.detail.type;
        this.subjectCase = event.detail.subject;
    };

    @wire(casesSearch, {
        caseStatus: '$status',
        accountName: '$accountName',
        caseType: '$caseType',
        subjectCase: '$subjectCase'
    })
    wiredCaseList({data, error}) {
        if(data) {
            this.caseList = data;
        } else if (error) {
            this.error = error;
            console.log('eerrrrooorrrr ' + error);
            console.log(this.error);
        }
    };
}