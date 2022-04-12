// import { BehaviorSubject,of } from "rxjs";
// import {mockedMasterData} from './master-data.service.spec';
// import {} from 'jest-preset-angular/presets'
// class NominationServiceMock{

//     customerSubject = new BehaviorSubject<string[]>([]);
//     customers$=this.customerSubject.asObservable();

//     private contractSubject= new BehaviorSubject<string[]> ([]);
//     contracts = this.contractSubject.asObservable();

//     private typeSubject  = new BehaviorSubject<string[]>([]);
//     types$ = this.typeSubject.asObservable();

//     assetGroup$= of(mockedMasterData.assetGroup);

//     vessels$= of(['']);
//     getVesselLength= jest.fn().mockImplementation((vessel:string)=>{
//         if(vessel === 'Vessel-1') return '100 ft';
//         else if( vessel === 'Vessel-2') return '200 ft';
//         return "";
//       });

// }