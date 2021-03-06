import { style } from '@angular/animations';
import { APP_ID, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../../shared/rest-api.service';
import { GoogleObj } from '../../shared/GoogleObj'

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.css']
})
export class DocListComponent implements OnInit {
 public result: any = [];
 public title: any = [];
 section: any = [];
 image: any = [];
 list3: any = [];
 list4: any = [];
 list5: any = [];
 list6: any = [];
 media: any = [];
 genLink: any = [];
 docLink: any = [];
 indent1 = false;
 indent2 = false;
 showModal!: boolean;

  constructor(private activatedRoute: ActivatedRoute, private restApiService: RestApiService) {
    
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe((d) =>{
      // this.getDocList(d['docId'])
      this.getDocTitle(d['docId'])
      this.getDocSections(d['docId'])
      this.getImage(d['docId'])
      this.getDocLink(d['docId'])
      this.getLinks(d['docId'])
      // this.filterLayout()
    })
    this.filterLayout()
    
  }

  getDocTitle(docId: number){
    this.restApiService.getTitle(docId).subscribe((titles: any)=>{
      this.title = titles
    })
  }

  getDocSections(docId: number){
    this.restApiService.getDocSectWithText(docId).subscribe((sections) => {
      this.section = sections
      // console.log(this.section)
      this.filterLayout()
    })
    
  }

  getImage(docId: number){
    this.restApiService.getImageData(docId).subscribe((images) => {
      this.image = images
      // console.log(this.image)
      this.filterLayout()
    })
   
  }

  getDocLink(docId: number){
    this.restApiService.getGenLink(docId).subscribe((link) => {
      this.genLink = link
      console.log(this.genLink)
      this.filterLayout()
      
    })
  }

  getLinks(docId: number){
    this.restApiService.getDocumentLinks(docId).subscribe((docsLink) => {
      this.docLink = docsLink
      this.filterLayout()
    })
  }

  filterLayout(){
    const parseResult = () =>{
      const sections: Array<[any]> = this.section
      const images: Array<[any]> = this.image
      const links: Array<[any]> = this.genLink
      const docLinks: Array<[]> = this.docLink
      const filter: any = {};
      for (this.list3 of sections){
        filter[`docSectionID${this.list3.docSectionID}`] = this.list3;
        filter[`docSectionID${this.list3.docSectionID}`].children = [];
        
        for (this.list4 of images) {
          if (this.list4.docSectionID === this.list3.docSectionID){
            filter[`docSectionID${this.list3.docSectionID}`].children.push(this.list4)
          }
        }
        for (this.list5 of links){
          if (this.list5.docSectionID === this.list3.docSectionID){
            filter[`docSectionID${this.list3.docSectionID}`].children.push(this.list5)
          }
        }
        for (this.list6 of docLinks){
          if (this.list6.docSectionID === this.list3.docSectionID){
            filter[`docSectionID${this.list3.docSectionID}`].children.push(this.list6)
          }
        }
      }
      console.log(filter)
    }
    parseResult();
    
  };

  openNewTab(hyperLinkText: string){
    window.open(hyperLinkText, "_blank");
  }

  printPage(){
    window.print();
  }

  
   


  // send() {
  //   const googleObj: GoogleObj = {
  //   q: 'hello',
  //   target: 'es'
  //   };
  
}
