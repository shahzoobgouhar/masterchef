import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { catchError, map, tap } from 'rxjs/operators'
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = 'https://ng-complete-guide-336d0-default-rtdb.firebaseio.com/posts.json'
  error = new Subject<string>()
  constructor(private http: HttpClient) {
  }

  createAndStorePost(postData: Post) {
    this.http.post<{ name: string }>(this.url, postData, { observe: 'response' })
      .subscribe((res) => {
        console.log(res.body);
      }, error => {
        this.error.next(error.message);
      })
  }

  fetchPosts(): Observable<Post[]> {
    let searchParams = new HttpParams();
    searchParams = searchParams.set("print", "pretty");
    searchParams = searchParams.set("custQP", "testQP");
    return this.http
      .get<{ [key: string]: Post; }>(this.url, {
        headers: new HttpHeaders({
          custom: 'testHeader'
        }),
        params: searchParams,
        responseType: 'json' // text
      })
      .pipe(
        map((responseData) => {
          console.log('Res', responseData);
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((errorRes) => {
          //can use catcherror for generic handling like send data to analytics server
          //throw error will return an observable which will wrap the error.
          return throwError(errorRes.message)
        })
      );
  }

  clearPosts(): Observable<any> {
    return this.http
      .delete(this.url, { observe: 'events' })
      .pipe(tap((event) => {
        console.log(event);
        
        if (event.type === HttpEventType.Sent) {
          console.log(event.type);
        }
        if (event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      }))
  }
}
