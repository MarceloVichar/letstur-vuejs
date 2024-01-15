import type {CompanyType} from '~/services/api/shared/company/CompanyType';
import type {VehicleType} from '~/services/api/company/records/vehicle/VehicleType';

export class VehicleData {
  id: number;
  licensePlate: string;
  type: string;
  model: string;
  numberOfSeats: string | number;
  ownerName: string;
  ownerDocument: string;
  ownerPhone?: string;
  ownerEmail?: string;
  cnhTypeRequired?: string;
  companyId?: number;
  company: CompanyType;
  createdAt?: string;
  updatedAt?: string;

  constructor(data: VehicleType) {
    this.id = data.id;
    this.licensePlate = data.licensePlate;
    this.type = data.type;
    this.model = data.model;
    this.numberOfSeats = data.numberOfSeats;
    this.ownerName = data.ownerName;
    this.ownerDocument = data.ownerDocument;
    this.ownerPhone = data.ownerPhone;
    this.ownerEmail = data.ownerEmail;
    this.cnhTypeRequired = data.cnhTypeRequired;
    this.companyId = data.companyId;
    this.company = data.company;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
