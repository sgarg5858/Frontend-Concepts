import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ContractService } from './contract.service';
import { MasterDataService } from './master-data.service';

@Injectable({
  providedIn: 'root'
})
export class NominationService {

  constructor(private masterDataService:MasterDataService, private contractService:ContractService) { }

  private customerSubject  = new BehaviorSubject<string[]>([]);
  customers$ = this.customerSubject.asObservable();

  private contractSubject= new BehaviorSubject<string[]> ([]);
  contracts = this.contractSubject.asObservable();

  private typeSubject  = new BehaviorSubject<string[]>([]);
  types$ = this.typeSubject.asObservable();

  filterCustomers(assetGroup: string) {
    this.customerSubject.next(this.masterDataService.getCustomer(assetGroup));

    //Calling this if we change AssetGroup after selecting customer and contract
    //so that we reset them accordingly
    this.filterContracts("", new Date(), new Date());
  }

  filterContracts(customer:string, startDate:Date, endDate:Date) {
    this.contractSubject.next(
      this.contractService.getContracts(customer, startDate, endDate)
    );
    this.filterTypes("");
  }
  filterTypes(contract: string) {
    this.typeSubject.next(this.masterDataService.getTypes(contract));
  }

  get assetGroup$(): Observable<string[]> {
    return of(this.masterDataService.getAssetGroup());
  }

  get vessels$(): Observable<string[]> {
    return of([...this.masterDataService.vessels.map(v => v.vessel)]);
  }

  getVesselLength(vessel:string): string {
    return this.masterDataService.getVesselLength(vessel)
  }

}
