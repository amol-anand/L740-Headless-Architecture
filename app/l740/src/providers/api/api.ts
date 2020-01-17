
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { STUBS, STUBS_URL, SERVER_URL } from '../config'

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {

    constructor(public http: HttpClient) {
    }

    buildEndPoint(endpoint: string) {
        if (STUBS === true) {
            endpoint = STUBS_URL + endpoint + ".json";
            console.info("Stubs Built Endpoint: "+endpoint);
        } else {
            endpoint = SERVER_URL + endpoint;
            console.info("Server Built Endpoint: "+endpoint);
        }
        return endpoint;
    }

    get(endpoint: string): Observable<HttpResponse<any>> {
        endpoint = this.buildEndPoint(endpoint);
        console.log("Endpoint called: "+endpoint);
        return this.http.get(endpoint, {observe: 'response'});
    }
}
