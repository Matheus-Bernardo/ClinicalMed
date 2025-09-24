export interface ICreatePrescription {
  patientName:string,
  doctorName:string,
  validityPrescription:number,
  crmDoctor:string,
  remedyPrescription:Array<string>,
  frequency:string,
  dosageRemedy:string,
  frequencyRemedy:string,
  observation:string,
  createdAt:Date
}