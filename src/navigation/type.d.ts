import {customerType} from '../type';

export declare type StackParameterList = {
  SPLASH: undefined;
  LOGIN: undefined;
  HOME: undefined;
  CUSTOMERS: {allowAll: string};
  PLACE_ORDER: {customerData: customerType | undefined};
  INVOICE_PAYMENT: {customerData: customerType | undefined};
  OLD_INVOICE: undefined;
  ADD_INVOICE_AMOUNT: {
    invoiceData: any;
    customerData?: customerType;
    isFixAmount: string | undefined;
    printText:any;
  };
  POS: undefined;
  NEW_BOTTOM_TAB:undefined;
  DRAWER_NAVIGATION:undefined;
  SIGNUP:undefined;
  IMAGE_UPLOAD:undefined;
  USER_MORE_INFO:undefined;
};
