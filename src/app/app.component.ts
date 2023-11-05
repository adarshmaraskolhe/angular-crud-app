import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';
import { WarnDeleteDialogComponent } from './warn-delete-dialog/warn-delete-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-crud-app';

  displayedColumns: string[] = [
    'id',
    'firstName', 
    'lastName', 
    'email', 
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private _dialog:MatDialog , 
    private _empService:EmployeeService,
    private _coreService:CoreService,
    ){}

  ngOnInit(): void {
      this.getEmployeeList()
  }
  openAddEditEmpForm(){
    const dialogRef=this._dialog.open(EmpAddEditComponent)
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList()
        }
      }
    })
  }

  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next:(res)=>{
        console.log("getEmployeeList",res)
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.sort=this.sort
        this.dataSource.paginator=this.paginator
      },
      error:(err)=>{
        console.log(err)
      }
    }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteemployee(id:number){
    const deleteDialog=this._dialog.open(WarnDeleteDialogComponent)
    deleteDialog.afterClosed().subscribe({
      next:(val)=>{
        if (val){
          this._empService.deleteEmployee(id).subscribe({
            next:(res)=>{
              // alert('Employee Deleted !')
              this._coreService.openSnackBar('Employee Deleted !','Done')
              this.getEmployeeList()
            },
            error:console.log
          })
        }else{
          this.getEmployeeList()
        }
      }
    })
  }

  openEditForm(data:any){
    const editDialogRef=this._dialog.open(EmpAddEditComponent,{
      data,
    })
    editDialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList()
        }
      }
    })

  }
}
