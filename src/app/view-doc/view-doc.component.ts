import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-doc',
  templateUrl: './view-doc.component.html',
  styleUrls: ['./view-doc.component.css']
})
export class ViewDocComponent implements OnInit {
  document!: { docID: number; name: string; };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.document = {
      docID: this.route.snapshot.params ['docId'],
      name: this.route.snapshot.params ['courseName']
    };
  }

}
