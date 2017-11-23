import { Injectable }    from '@angular/core';


import { ConsommationDepositParPdv } from '../models/consommationdepositparpdv';
import { ConsommationDepositParPdvMock } from '../mocks/consommationdepositparpdv.mock';

import { ConsommationDepositParServiceType } from '../models/consommationdepositparservicetype';
import { ConsommationDepositParServiceTypeMock } from '../mocks/consommationdepositparservicetype.mock';

import { MonitoringDepositAdminpdv } from '../models/monitoringdepositadminpdv';
import { MonitoringDepositAdminpdvMock } from '../mocks/monitoringdepositadminpdv.mock';

import { Recouvrementadminpdv } from '../models/recouvrementadminpdv';
import { RecouvrementadminpdvMock } from '../mocks/recouvrementadminpdv.mock';




@Injectable()
export class AdminpdvMonitoringService {

  getRecouvrementadminpdvMock(): Promise<Recouvrementadminpdv[]> {
    return Promise.resolve(RecouvrementadminpdvMock);
  }
  getRecouvrementadminpdv(id: number): Recouvrementadminpdv {
    return RecouvrementadminpdvMock.find(recouvrementadminpdv => recouvrementadminpdv.id === id);
  }
  
  getMonitoringDepositAdminpdvMock(): Promise<MonitoringDepositAdminpdv[]> {
    return Promise.resolve(MonitoringDepositAdminpdvMock);
  }
  getMonitoringDepositAdminpdv(id: number): MonitoringDepositAdminpdv {
    return MonitoringDepositAdminpdvMock.find(monitoringDepositAdminpdv => monitoringDepositAdminpdv.id === id);
  }
  
  getConsommationDepositParServiceTypeMock(): Promise<ConsommationDepositParServiceType[]> {
    return Promise.resolve(ConsommationDepositParServiceTypeMock);
  }
  getConsommationDepositParServiceType(id: number): ConsommationDepositParServiceType {
    return ConsommationDepositParServiceTypeMock.find(consommationdepositparservicetype => consommationdepositparservicetype.id === id);
  }
  
  getConsommationDepositParPdvMock(): Promise<ConsommationDepositParPdv[]> {
    return Promise.resolve(ConsommationDepositParPdvMock);
  }
  getConsommationDepositParPdv(id: number): ConsommationDepositParPdv {
    return ConsommationDepositParPdvMock.find(consommationdepositparpdv => consommationdepositparpdv.id === id);
  }
  
}
