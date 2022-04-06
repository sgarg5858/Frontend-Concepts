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

describe('MasterDataService', () => {
  let service: MasterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAssetGroup method should return assetGroups',()=>{
    service.masterData=mockedMasterData;
    let assetGroups = service.getAssetGroup();

    expect(assetGroups.length).toBe(3);
  })

  it(' getTypes method should returns Marine type when we pass Contract-1 (Valid) Contract ',()=>{
    service.masterData=mockedMasterData;
    let types = service.getTypes('Contract-1');

    expect(types.length).toBe(1);
    expect(types[0]).toBe("Marine");
  })

  it(' getTypes method should returns Empty Array of types when we pass Contract-5 (Invalid) Contract ',()=>{
    service.masterData=mockedMasterData;
    let types = service.getTypes('Contract-5');

    expect(types.length).toBe(0);
    expect(types).toEqual([])
  })

  it(' getCustomer method should returns Customer-1 customer when we pass AssetGroup-1(Valid) assetGroup',()=>{
    service.masterData=mockedMasterData;
    let customer = service.getCustomer("AssetGroup-1");

    expect(customer.length).toBe(1);
    expect(customer[0]).toBe('Customer-1');

  })

  it(' getCustomer method should returns empty Array when we pass AssetGroup-10(Invalid) assetGroup ',()=>{
    service.masterData=mockedMasterData;
    let customer = service.getCustomer("AssetGroup-10");

    expect(customer.length).toBe(0);
    expect(customer[0]).toEqual([]);

  })

  it('getVesselLength method should return 100 ft  length when we pass Vessel-1 Vessel to it',()=>{

    service.masterData = mockedMasterData;
    let VesselLength= service.getVesselLength(mockedMasterData.vessels[0].vessel);

    console.log("Master Service",VesselLength);
    expect(VesselLength).toBe('100 ft')

  })

  it('getVesselLength method should return undefined length when we pass Vessel-1 Vessel to it',()=>{

    service.masterData = mockedMasterData;
    let VesselLength  = service.getVesselLength("Vessel-3");

    console.log("Master Service",VesselLength);
    expect(VesselLength).toBe('')

  })


});
