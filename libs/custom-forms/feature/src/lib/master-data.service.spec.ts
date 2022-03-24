import { TestBed } from '@angular/core/testing';
import exp = require('constants');

export const mockedMasterData ={
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

import { MasterDataService } from './master-data.service';

fdescribe('MasterDataService', () => {
  let service: MasterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(' getAssetGroup method should return assetGroups',()=>{
    service.masterData=mockedMasterData;
    let assetGroups = service.getAssetGroup();
    console.log("MASTER SERVICE",assetGroups)
    expect(assetGroups.length).toBe(3);
  })

  it(' getTypes method should returns types based on type of contract',()=>{
    service.masterData=mockedMasterData;
    let type = service.getTypes('Contract-1');

    console.log("MASTER SERVICE",type)
    expect(type.length).toBe(1);
    expect(type[0]).toBe("Marine");

  })

  it(' getCustomer method should returns customer based on type of assetGroup selected',()=>{
    service.masterData=mockedMasterData;
    let customer = service.getCustomer("AssetGroup-1");

    console.log("Master Service",customer);
    expect(customer.length).toBe(1);
    expect(customer[0]).toBe('Customer-1');

  })

  it('getVesselLength method should return correct length of vessel passed to it',()=>{

    service.masterData = mockedMasterData;
    let VesselLength= service.getVesselLength(mockedMasterData.vessels[0].vessel);

    console.log("Master Service",VesselLength);
    expect(VesselLength).toBe('100 ft')

  })


});
