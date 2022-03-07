import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocSearch } from '../shared/doc-search';
import { forkJoin } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RestApiService  {
  public docSearch: DocSearch[] = [];
  
  // Define API
  apiGetAllInfo = 'http://10.51.8.92:443/api/VWIDocument/GetAllInfo/${DocID}';
  apiGetTitle = 'http://10.51.8.92:443/api/VWIDocument/GetTitle/{DocID}';
  apiGetGenLink = 'http://10.51.8.92:443/api/VWIDocument/GetGenLink/{DocID}';
  apiGetDocSectionsWithText = 'http://10.51.8.92:443/api/VWIDocument/DocSectionsWithText/{DocID}';
  apiGetImageData = 'http://10.51.8.92:443/api/VWIDocument/ImageData/{DocID}';
  apiGetByDocID = 'http://10.51.8.92:443/api/VWIDocument/ByDocID/{DocID}';
  apiGetCourseList = 'http://10.51.8.92:443/api/Training/VWIAll';
  apiGetDocGroup = `http://10.51.8.92:443/api/VWIDocument/GetGroupByWCJC/{WC}/{JC}`;
  apiGetCourseByGroup = `http://10.51.8.92:443/api/VWIDocument/GetWCJCGroup/{WC}/{JC}`;
  

  constructor(private http: HttpClient) { }
  loadedResult!: {};
  ngOnInit(){
    
    
  }

  getGenLink(docId: number){
    let docLink = `http://10.51.8.92:443/api/VWIDocument/GetGenLink/${docId}`;
    return this.http.get(docLink)
  }

  getMedia(event3: any){
    // let media = (`http://10.51.8.92:443/api/VWIDocument/GetMedia/${event3}`, event3);
    return this.http.get(`http://10.51.8.92:443/api/VWIDocument/GetMedia/${event3}`, event3)
  }

  getImageData(docId: number){
      let img = `http://10.51.8.92:443/api/VWIDocument/ImageData/${docId}`;
      return this.http.get(img)
  }
  
  getDocSectWithText(docId: number){
    let sect = `http://10.51.8.92:443/api/VWIDocument/DocSectionsWithText/${docId}`;
    return this.http.get(sect)
  }

  getAllInfo(docId: number) {
    // return this.http.get<DocSearch[]>(this.apiGetAllInfo)
    let doc = `http://10.51.8.92:443/api/VWIDocument/GetAllInfo/${docId}`;
    return this.http.get(doc);
      
  }

  getTitle(docId: number) {
      let url = `http://10.51.8.92:443/api/VWIDocument/GetTitle/${docId}`
      return this.http.get(url)
  }

  getCourseList() {
    return this.http.get<DocSearch[]>(this.apiGetCourseList)
      
  }

  getWorkCenter(){
    let url = 'http://10.51.8.92:443/api/VWIDocument/GetWorkCenter';
    return this.http.get(url);
  }
  
  getJobCode(event: any){
   
    return this.http.get(`http://10.51.8.92:443/api/VWIDocument/GetJobCode/${event}`, event);
  }

  getGroupByWCJC(event: any, event2: any){
    return this.http.get(`http://10.51.8.92:443/api/VWIDocument/GetGroupByWCJC/${event}/${event2}`)
  }
    
  getCourseByGroup(event: any, event2: any){
    return this.http.get(`http://10.51.8.92:443/api/VWIDocument/GetWCJCGroup/${event}/${event2}`)
  }
    
  getAllGroupAndCourse(event: any, event2: any){
    let group = this.http.get(`http://10.51.8.92:443/api/VWIDocument/GetGroupByWCJC/${event}/${event2}`)
    let course = this.http.get(`http://10.51.8.92:443/api/VWIDocument/GetWCJCGroup/${event}/${event2}`)

    forkJoin([group, course]).subscribe(result => {
      result[0] = result[1];
      this.loadedResult = result[0]
    }) 
  }

 
   
 
}
