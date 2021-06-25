import { LightningElement, wire,api} from 'lwc';
//import casesSearch from '@salesforce/apex/SearchResultController.casesSearch';
const columns = [
    {label: 'Account Name', fieldName: 'AccountName', sortable: true},
    {label: 'Type', fieldName: 'Type', sortable: true},
    {label: 'Case Number', fieldName: 'CaseNumber', sortable: true},
    {label: 'Status', fieldName: 'Status', sortable: true},
    {label: 'Description', fieldName: 'Description', sortable: true},
    {label: 'Subject', fieldName: 'Subject', sortable: true}
];

export default class CaseResult extends LightningElement {
     @api caseList;
   //  @api status ;
   //  @api accountName;
   //  @api caseType ;
   //  @api subjectCase ;

 /*   @wire(casesSearch,{
        caseStatus: '$status',
        accountName: '$accountName',
        caseType: '$caseType',
        subjectCase: '$subjectCase'
    }) wiredCaseList({data, error}) {
        if(data) {
            this.caseList = data;
            console.log('data '+ this.caseList);
            console.log('caseList ',JSON.stringify(data));
            console.log(data);
            console.log(this.caseList);
            console.log(JSON.stringify(data));
        } else if (error) {
            this.error = error;
            console.log(error);
            console.log(this.error);
        }
    };*/

    error;
    columns = columns;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;


    sortBy(field, reverse, primer) {
        const key = primer
            ? function(x) {
                 return primer(x[field]);
            }
            : function(x) {
                 return x[field];
            };

        return function(a, b) {
            a = key(a);
            b = key(b);
        return reverse * ((a > b) - (b > a));
        };
    }

   onHandleSort(event) {
       const { fieldName: sortedBy, sortDirection } = event.detail;
       const cloneData = [...this.data];

       cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
           this.data = cloneData;
           this.sortDirection = sortDirection;
           this.sortedBy = sortedBy;
   }
 }