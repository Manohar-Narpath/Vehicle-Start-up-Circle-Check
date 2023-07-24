import { Component, Inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { InspectionService } from '../inspection.service';
import { Vehicle } from '../vehicle.model';

@Component({
  selector: 'app-add-inspection-dialog',
  templateUrl: './add-inspection-dialog.component.html',
  styleUrls: ['./add-inspection-dialog.component.scss'],
})
export class AddInspectionDialogComponent {
  vehicleForm!: FormGroup;
  minDate = new Date();

  ngOnInit(): void {
    // this.circleCheckForm.valueChanges.subscribe((v) => {
    //   console.log(
    //     '🚀 ~ file: add-inspection-dialog.component.ts:28 ~ AddInspectionDialogComponent ~ this.circleCheckForm.valueChanges.subscribe ~ v:',
    //     v
    //   );
    // });
  }
  elementsToBeVerified = [
    {
      id: '2f0382c5',
      label: 'Parking Brake - holds against slight acceleration',
    },
    { id: 'bf50058e', label: 'Foot Brake - holds, stops vehicle smoothly' },
    {
      id: 'e1095d9e',
      label:
        'Clutch and Gearshift - shifts smoothly without jumping or jerking',
    },
    { id: 'b393a26b', label: `Steering - moves smoothly; no "play"` },
    {
      id: 'af01fbb6',
      label:
        'Lights - headlights, warning lights, and turn signals operational',
    },
    {
      id: 'c6b9253f',
      label: 'Dash Control Panel - all lights and gauges operational',
    },
    { id: 'e66ad327', label: 'All Moving Parts - no strange noises' },
    { id: 'd7f41ad7', label: 'Horn – operational' },
    {
      id: '9036143c',
      label: 'Visibility - mirrors properly adjusted; windows clean and intact',
    },
    { id: '9c360eef', label: 'Wipers/washer - functioning and intact' },
    { id: '6a57389a', label: 'Tires - pressure, tread depth or damage' },
    {
      id: '48ed7f6b',
      label:
        'Wheels and fasteners - no defects in rim, loose or missing fasteners',
    },
    { id: '698243d9', label: 'Seat belts - in good condition and being used' },
    {
      id: 'f1ffecfc',
      label: 'Vehicle back-up alarm - operational, where required',
    },
    {
      id: '9a60e2b3',
      label:
        'Hydraulic systems - no evidence of leaks and systems operate smoothly',
    },
    {
      id: '9a735dfe',
      label: 'For tractors, power take off shields - in place',
    },
    {
      id: '619f304c',
      label:
        'Fluid levels verified - oil, gas, brakes, washer fluid. Check for leaks',
    },
    {
      id: 'f0b3dbb5',
      label:
        'Load - secure and complying with regulations; hitch in good condition',
    },
    {
      id: 'fc488da4',
      label:
        'Emergency equipment - installed and inspected as required by law or company policy',
    },
  ];

  operators = [
    { id: 'e02d354c', name: 'Liam MacDonald' },
    { id: 'd030d6f5', name: 'Olivia Tremblay' },
    { id: 'cb14afe9', name: 'Ethan Chen' },
    { id: 'd8c4ce71', name: 'Isabella Singh' },
    { id: '201738ca', name: 'Noah Dubois' },
    { id: '47aaecd3', name: 'Emma Patel' },
    { id: '903a924e', name: 'Lucas Wong' },
  ];

  vehicles = [
    { id: '8ba1f74e', name: 'Chevrolet Silverado' },
    { id: '06f7a127', name: 'Ford F-150' },
    { id: 'e455426c', name: 'Chrysler Pacifica ' },
    { id: '1473e694', name: 'Honda Odyssey' },
    { id: 'c2746fba', name: 'GO Transit bus' },
    { id: '7abcb8d5', name: 'Delivery Truck ' },
    { id: 'ac8cdf2b', name: 'York Region Fire Services vehicle' },
  ];

  circleCheckForm!: FormGroup;

  public get questions(): any {
    return this.circleCheckForm.get('questions');
  }

  constructor(
    private fb: FormBuilder,
    private inspectionService: InspectionService,
    private dialogRef: MatDialogRef<AddInspectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vehicle,
    private _snackBar: MatSnackBar
  ) {
    this.circleCheckForm = this.fb.group({
      vehicleId: new FormControl(data?.vehicleId, Validators.required),
      date: new FormControl(data?.date, Validators.required),
      odometer: new FormControl(data?.odometer, Validators.required),
      operator: new FormControl(data?.operator, Validators.required),
      notes: new FormControl(data?.notes),
      questions: new FormArray(
        this.elementsToBeVerified.map(
          (e, i) =>
            new FormGroup({
              questionId: new FormControl(e.id),
              answer: new FormControl(
                (data?.questions[i] as any)?.answer,
                Validators.required
              ),
            })
        )
      ),
    });
  }

  submit() {
    const inspectionFailed = this.circleCheckForm.value.questions.some(
      (q: any) => {
        return q.answer === false;
      }
    );

    if (this.data?.vehicleId) {
      this.inspectionService
        .update(this.data.id, {
          ...this.circleCheckForm.value,
          status: inspectionFailed ? false : true,
        })
        .pipe(
          tap((res) => {
            this.circleCheckForm.reset();

            this.dialogRef.close();
            this._snackBar.open(
              inspectionFailed
                ? 'Some checks failed! Your vehicle require attention.'
                : 'All checks passed! Your vehicle is in excellent condition.',
              '❌',
              { duration: 5000 }
            );
          })
        )
        .subscribe((res) => {});
    } else {
      this.inspectionService
        .add({
          ...this.circleCheckForm.value,
          status: inspectionFailed ? false : true,
        })
        .pipe(
          tap((res) => {
            this.circleCheckForm.reset();
            this.dialogRef.close();
            this._snackBar.open(
              inspectionFailed
                ? 'Some checks failed! Your vehicle require attention.'
                : 'All checks passed! Your vehicle is in excellent condition.',
              '❌',
              { duration: 5000 }
            );
          })
        )
        .subscribe();
    }
  }
}
