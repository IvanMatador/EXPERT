export interface User {
  idReport: number,
  idSubject: number,
  reportState: string,
  termType: string,
  publicationType: string,
  reportGroup: string,
  outputNumber: string,
  outputDate: {
    date: string,
    timezone_type: number,
    timezone: string
  },
  bSentToNSSMC: true,
  bDisclosure: true,
  dateFill: {
    date: string,
    timezone_type: number,
    timezone: string
  },
  reportFormat: string
} 

export interface UserData {
  publicationType: string;
  termType: string;
  reportGroup: string;
  reportState: string;
  reportFormat: string;
  outputDate: string;
  outputNumber: string;
  res?: any;
}

export interface ValueAsObject {
  value: string;
  type: string[];
}
