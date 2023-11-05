import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnDeleteDialogComponent } from './warn-delete-dialog.component';

describe('WarnDeleteDialogComponent', () => {
  let component: WarnDeleteDialogComponent;
  let fixture: ComponentFixture<WarnDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarnDeleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarnDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
