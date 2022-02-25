import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestApiService } from '../../shared/rest-api.service';
import { RouterModule, Routes } from '@angular/router';
// import { MaterialModule } from '../../material/material/material.module';



@Component({
  selector: 'app-drop-lists',
  templateUrl: './drop-lists.component.html',
  styleUrls: ['./drop-lists.component.css']
})
export class DropListsComponent implements OnInit {
  public WorkCenter: any;
  public JobCode: any;
  selectedValue: any;
  selectedValue2: any;
  result: any = [];
  group: any = [];
  filtered: any = [];
  list1: any = [];
  list2: any = [];
  @Output() select = new EventEmitter();

  searchForm = new FormGroup({
    WorkCenter: new FormControl(),
    JobCode: new FormControl()
  })

  constructor(private restApiService: RestApiService, private fb: FormBuilder, private routes: RouterModule) {
    this.searchForm = this.fb.group({
      WorkCenter:[''],
      JobCode:['']
      
    }) 
   }

  ngOnInit() {
    this.restApiService.getWorkCenter().subscribe((response => {
      this.WorkCenter = response;
      // console.log(response);
    }));

    this.searchForm = this.fb.group({
      WorkCenter: [],
      JobCode: [],
      
    });

    this.searchForm.get("WorkCenter")?.valueChanges.subscribe((selectedValue: any) => {
      console.log('WorkCenter value changed')
      console.log(selectedValue)
    });

    this.searchForm.get("JobCode")?.valueChanges.subscribe((selectedValue2: any) => {
      console.log('JobCode value changed')
      console.log(selectedValue2) 
      // console.log(this.searchForm)   
    }); 
  }

  onSelect1(event: any){ 
    const workCenterValue = event.target.value.substring(event.target.value.indexOf(':') + 1).trim();
    this.restApiService.getJobCode(workCenterValue).subscribe((response => {
      this.JobCode = response; 
      
    })); 
  }


  onSelect2(event2: any){
    const jobCode = event2.target.value.substring(event2.target.value.indexOf(':') + 1).trim();
    // console.log(jobCode); 
    this.runGroup()
    this.runCourse()
    
    
  }

 runGroup(){
   const formValue = this.searchForm.value;
   this.restApiService.getGroupByWCJC(formValue.WorkCenter, formValue.JobCode).subscribe((response => {
    this.result = response;
    console.log(this.result)
    
  }))
 }

 runCourse(){
  const formValue = this.searchForm.value;
  this.restApiService.getCourseByGroup(formValue.WorkCenter, formValue.JobCode).subscribe((response => {
    this.group = response; //=this.group

    console.log(this.group)
  }))
  this.filterArray()
 }
  
 /////filterArray() conforms 2 arrays to courseGroupID allowing the accordion 
 /////style selection to populate courseName with linked courseNameDescr
 filterArray(){
   const parseResults = () =>{
     const results: Array<[any]> = this.result
     const bigList: Array<[any]> = this.group
     const filtered: any = {};
     for (this.list1 of results){
      filtered[`courseGroupID${this.list1.courseGroupID}`] = this.list1;
      filtered[`courseGroupID${this.list1.courseGroupID}`].children = [];

      for (this.list2 of bigList) {
        if (this.list2.courseGroupID === this.list1.courseGroupID) {
          filtered[`courseGroupID${this.list1.courseGroupID}`].children.push(this.list2)
        }
      }
    }
    console.log(filtered)
   }
 parseResults();
};

getDoc(){
  this.select.emit();
  console.log(this.select)
}
 


  submit(){
    alert(JSON.stringify(this.searchForm.value))
    console.log("Form Submitted")  
  } 
 

}
