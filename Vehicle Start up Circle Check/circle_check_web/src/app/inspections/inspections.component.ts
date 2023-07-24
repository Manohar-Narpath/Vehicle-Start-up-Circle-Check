import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { AddInspectionDialogComponent } from '../add-inspection-dialog/add-inspection-dialog.component';
import { InspectionService } from '../inspection.service';
import { Vehicle } from '../vehicle.model';

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.scss'],
})
export class InspectionsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'vehicleId',
    'date',
    'odometer',
    'operator',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<Vehicle>();

  constructor(
    private inspectionService: InspectionService,
    private dialog: MatDialog
  ) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.loadVehicles();
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(AddInspectionDialogComponent, {
      width: '1000px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadVehicles();
    });
  }

  loadVehicles() {
    this.inspectionService
      .get()
      .pipe(take(1))
      .subscribe((vehicles: any) => {
        this.dataSource.data = vehicles;
      });
  }

  updateVehicle(vehicle: Vehicle) {
    const dialogRef = this.dialog.open(AddInspectionDialogComponent, {
      width: '1000px',
      data: vehicle,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadVehicles();
    });
  }

  deleteVehicle(vehicleId: string) {
    this.inspectionService.delete(vehicleId).subscribe(() => {
      this.loadVehicles();
    });
  }
}
