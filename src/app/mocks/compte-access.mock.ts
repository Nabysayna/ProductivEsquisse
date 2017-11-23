import { CompteAccess } from '../models/compte-access';

export const CompteAccessMock: CompteAccess[] = [
  { id: 1, email: 'gaayi',  password: 'diarediale',  codesecret: 'diarediale', role: 'pdv', token: 'gaayi'},  
  { id: 2, email: 'adminpdv',  password: 'diarediale',  codesecret: 'diarediale', role: 'admin-pdv', token: 'adminpdv'},  
  { id: 3, email: 'adminmpdv',  password: 'diarediale',  codesecret: 'diarediale', role: 'admin-mult-pdv', token: 'adminmpdv'}  
];
