import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../../shared/rest-api.service';

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.css']
})
export class DocListComponent implements OnInit {
 public result: any = []
 public title: any = []
 section: any = []
 image: any = []
 list1: any = []
 list2: any = []
 indent1 = false;
 indent2 = false;
  constructor(private activatedRoute: ActivatedRoute, private restApiService: RestApiService) {
    
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe((d) =>{
      this.getDocList(d['docId'])
      this.getDocTitle(d['docId'])
      this.getDocSections(d['docId'])
      this.getImage(d['docId'])
    })

    
  }

  getDocTitle(docId: number){
    this.restApiService.getTitle(docId).subscribe((titles: any)=>{
      this.title = titles
    })
  }

  getDocList(docId: number){
    this.restApiService.getAllInfo(docId).subscribe((list: any) => {
      this.result = list.filter((element: any, i: any) => i === list.indexOf(element))
      console.log(this.result)
    })
  }

  getDocSections(docId: number){
    this.restApiService.getDocSectWithText(docId).subscribe((sections) => {
      this.section = sections
      console.log(this.section)
    })
  }

  getImage(docId: number){
    this.restApiService.getImageData(docId).subscribe((images) => {
      this.image = images
      console.log(this.image)
    })
    this.filterLayout()
  }

  filterLayout(){
    const parseResults = () =>{
      const images: Array<[any]> = this.image
      const sections: Array<[any]> = this.section
      const filtered: any = {};
      for (this.list1 of sections){
        filtered[`docSectionID${this.list1.docSectionID}`] = this.list1;
        filtered[`docSectionID${this.list1.docSectionID}`].children = [];

        for (this.list2 of images) {
          if (this.list2.docSectionID === this.list1.docSectionID){
            filtered[`docSectionID${this.list1.docSectionID}`].children.push(this.list2)
          }
        }
      }
      console.log(filtered)
    }
    parseResults();
  };

  


}
