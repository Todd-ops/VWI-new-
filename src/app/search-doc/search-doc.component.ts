import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { DocSearch } from '../shared/doc-search';
import { Observable } from 'rxjs';
import { RestApiService } from '../shared/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-doc',
  templateUrl: './search-doc.component.html',
  styleUrls: ['./search-doc.component.css']
})
export class SearchDocComponent implements OnInit {

  title = 'Visual Work Instruction Search';
 public apiCourseList: Observable<DocSearch[]>
 public searchText: any;
 @Output() data = new EventEmitter()

  constructor(private restApiService: RestApiService, private router: Router, private route: ActivatedRoute) { 
    this.apiCourseList = this.restApiService.getCourseList();
    
  }

  ngOnInit() {
    
  }

  onDocIdClicked(event: any){
    this.router.navigate(['/view-doc/:docId', event, 'edit'], {queryParams: {allowEdit: event}});
  //   const docid = event.target.value.substring(event.target.value.indexOf(':') + 1).trim();
  //  console.log(docid)
  //  this.data.emit(document)
  }

}
