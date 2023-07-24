export interface Vehicle {
  id: string;
  vehicleId: number;
  date: Date;
  odometer: number;
  operator: string;
  questions: Record<string, boolean>[];
  notes: string;
  status: boolean;
}
