import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { catchError, concat, concatMap, delay, delayWhen, of, retryWhen, scan, take, tap, throwError, timer } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient:HttpClient) { }

  // getPosts()
  // {
  //   return this.httpClient
  //   .get<any[]>('https://jsonplaceholder.typicode.com/postss')
  //   .pipe(
  //     retryWhen(errors =>{
  //       return errors.pipe(
  //         concatMap((error,index)=> {
  //           if(index>=2) return throwError(error);
  //           else return of(error).pipe(delay(2000))
  //         })
  //       )
  //     }),
  //     catchError(()=>of(["Sanjay","Angular","Rxjs"])))
  // }

  getPosts()
  {
    return this.httpClient
    .get<any[]>('https://jsonplaceholder.typicode.com/postss')
    .pipe(
      retryWhen(errors =>{
        return errors.pipe(
         scan( (acc, error) => {
           if(acc>2) throw error;
           return acc+1;
         }, 1),
          delayWhen(val => timer(val * 1000)),
        )
      }),
      catchError(()=>of(["Sanjay","Angular","Rxjs"])))
    }


  // getPosts()
  // {
  //   return this.httpClient
  //   .get<any[]>('https://jsonplaceholder.typicode.com/postss')
  //   .pipe(
  //     retryWhen(errors =>{
  //       return concat(
  //         errors.pipe(
  //           delay(2000),
  //           take(2),
  //         ),
  //         throwError("Max Retries Exceeded!")
  //       )
  //     }),
  //     catchError(()=>of(["Sanjay","Angular","Rxjs"])))
  // }
}
