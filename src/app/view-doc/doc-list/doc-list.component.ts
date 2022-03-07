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
    })

    
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
      // this.filterLinks()
      
    })
  }

  filterLayout(){
    const parseResult = () =>{
      const sections: Array<[any]> = this.section
      const images: Array<[any]> = this.image
      const links: Array<[any]> = this.genLink
      const filter: any = {};
      const genLinkFilter: any = {};
      for (this.list3 of sections){
        filter[`docSectionID${this.list3.docSectionID}`] = this.list3;
        filter[`docSectionID${this.list3.docSectionID}`].children = [];
        // filter[`docSectionID${this.list3.docSectionID}`].children = [];// Trying to get list of reference links

        for (this.list4 of images) {
          if (this.list4.docSectionID === this.list3.docSectionID){
            filter[`docSectionID${this.list3.docSectionID}`].children.push(this.list4)
          }
        }
        for (this.list5 of links){
          if (this.list5.docSectionID === this.list3.docSectionID){
            filter[`docSectionID${this.list3.docSectionID}`].children.push(this.list5)
          }
          // if (this.list5.hyperLinkDescr !== null){
          //   this.list5.hyperLinkDescr.trim()
          // }
        }
      }
      console.log(filter)
    }
    parseResult();
    
  };

  // filterLinks(){
  //   const parseLinks = () =>{
  //     const sections: Array<[any]> = this.section
  //     const links: Array<[any]> = this.genLink
  //     const filter: any = {};
  //     for (this.list6 of sections){
  //       filter[`docSectionID${this.list6.docSectionID}`] = this.list6;
  //       filter[`docSectionID${this.list6.docSectionID}`].children = [];

  //       for (this.list5 of links){
  //         if (this.list5.docSectionID === this.list6.docSectionID){
  //           filter[`docSectionID${this.list6.docSectionID}`].children.push(this.list5)
  //         }
  //       }
  //     }
  //     console.log(filter)
  //   }
  //   parseLinks();
  // };

  


}
