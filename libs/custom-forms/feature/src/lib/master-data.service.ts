import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {


  masterData = {
    assetGroup: ['AssetGroup-1', 'AssetGroup-2', 'AssetGroup-3'],
    customer: [
      { customer: 'Customer-1', assetGroup: 'assetGroup-1' },
      { customer: 'Customer-2', assetGroup: 'assetGroup-2' },
      { customer: 'Customer-3', assetGroup: 'assetGroup-3' },
    ],
    types: [
      { type: 'Marine', contract: 'Contract-1' },
      { type: 'Transport', contract: 'Contract-2' },
    ],
    vessels: [
      { vessel: 'Vessel-1', length: '100 ft' },
      { vessel: 'Vessel-2', length: '200 ft' },
    ],
  };

  getAssetGroup(): string[] {
    return [...this.masterData.assetGroup];
  }
  
  getTypes(contract: string): string[] {
    return [
      ...this.masterData.types
        .filter((t) => t.contract === contract)
        .map((t) => t.type),
    ];
  }
  getCustomer(assetGroup: string): string[] {
    return [
      ...this.masterData.customer
        .filter((c) => c.assetGroup.toUpperCase() === assetGroup.toUpperCase())
        .map((c) => c.customer),
    ];
  }
  getVesselLength(vessel: string): string {
    console.log('vessel', vessel);
    return this.masterData.vessels.filter((v) => v.vessel === vessel)[0].length;
  }

  getVessels(): any[] {
    return [...this.masterData.vessels];
  }

  constructor() { }
}
