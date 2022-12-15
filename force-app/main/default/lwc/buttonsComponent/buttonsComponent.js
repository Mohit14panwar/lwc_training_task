import { LightningElement,api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import STATUS__FIELD from '@salesforce/schema/Bill__c.Status__c';
export default class ButtonsComponent extends LightningElement {
  
  isInvoicingStatus = false;
  isDraftStatus = true; 
  isInReviewalStatus = false; 
 @track billStatus;   
 @api recordId;
 //@track allData;
 @wire(getRecord,{recordId: '$recordId',fields:[STATUS__FIELD]}) 
 wireRecordStatus({data,error}){
  if(data){
    console.log(typeof(data));

    console.log(Object.keys(data));

    const {fields} = data;
    console.log(Object.keys(fields));

    Object.keys(fields).forEach(item =>{
    console.log(fields[item]);
    this.billStatus = fields[item] && fields[item].displayValue ? fields[item].displayValue : fields[item].value;
    console.log(this.billStatus);
})
  }
  if(error){
    console.log(error);
  }
  if(this.billStatus == 'Under invoicing'){
   this.productButtonOnInvoicingStatus();
  }else if(this.billStatus == 'Draft'){
   this.productButtonOnDraftStatus();
  }
  else if(this.billStatus == 'In reviewal'){
  this.buttonOnReviewalStatus();
  }
 }

 productButtonOnInvoicingStatus(){
    this.isInvoicingStatus = true;
    this.isDraftStatus = false;
 }
 productButtonOnDraftStatus(){
    this.isDraftStatus = true;
    this.isInvoicingStatus = false;
 }
 buttonOnReviewalStatus(){
 this.isInReviewalStatus = true;
 this.isInvoicingStatus = true;
 this.isDraftStatus = false;
 }
 /*reviewalProcess(){
 
 } */

}