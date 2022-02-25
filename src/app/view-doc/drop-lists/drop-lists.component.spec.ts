/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DropListsComponent } from './drop-lists.component';

describe('DropListsComponent', () => {
  let component: DropListsComponent;
  let fixture: ComponentFixture<DropListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
