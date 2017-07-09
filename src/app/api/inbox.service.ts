import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/do';  // for debugging

/**
* This class provides the Data service with methods to read names and add names.
*/
@Injectable()
export class InboxService {

  /**
  * Creates a new DataService with the injected Http.
  * @param {Http} http - The injected Http.
  * @constructor
  */
  constructor(private http: Http) {}

  /**
  * Returns an Observable for the HTTP GET request for the JSON resource.
  * @return {string[]} The Observable for the HTTP request.
  */
  getInbox(in_Params = undefined): Observable<any> {
    let params: URLSearchParams = new URLSearchParams();
    if (in_Params !== undefined) {
      params.set('filter', in_Params.filter);
      params.set('start', in_Params.startIndex);
    }

    return this.http.get('api/get_incidents.json', in_Params !== undefined ? {search: params} : undefined)
    .map((res: Response) => res.json().items);
    //              .do(data => console.log('server data:', data))  // debug
    //.catch(this.handleError);
  }

  getMessageView(in_Id: string): Observable<any> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('id', in_Id.toString());

    return this.http.get('api/get_incident.json', {search: params})
    .map((res: Response) => res.json());
    //              .do(data => console.log('server data:', data))  // debug
    //.catch(this.handleError);
  }

  removeItem(in_Params: any): Observable<any> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('ids', JSON.stringify(in_Params.ids));

    return this.http.get('api/remove_incident.json', {search: params})
    .map((res: Response) => res.json());
    //              .do(data => console.log('server data:', data))  // debug
    //.catch(this.handleError);
  }

  getNumUnreadedMessages( ): Observable<number> {

    return this.http.get('api/get_num_unreaded_incidents.json')
    .map((res: Response) => res.json().count);
    //              .do(data => console.log('server data:', data))  // debug
    //.catch(this.handleError);
  }


  /**
  * Handle HTTP error
  */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
