import type {CompanyType} from '~/services/api/shared/company/CompanyType';
import type {TourType} from '~/services/api/company/records/tour/TourType';
import type {TourGuideType} from '~/services/api/company/records/tour-guide/TourGuideType';
import type {VehicleType} from '~/services/api/company/records/vehicle/VehicleType';
import type {DriverType} from '~/services/api/company/records/driver/DriverType';
import type {EventType} from '~/services/api/company/event/EventType';

export class EventData {
  id: number;
  totalSeats: number;
  availableSeats: number;
  departureDateTime: string;
  arrivalDateTime: string;
  tourGuideId?: number;
  tourGuide?: TourGuideType;
  vehicleId?: number;
  vehicle?: VehicleType;
  tourId?: number;
  tour?: TourType;
  driverId?: number;
  driver?: DriverType;
  companyId?: number;
  company?: CompanyType;
  createdAt?: string;
  updatedAt?: string;

  constructor(data: EventType) {
    this.id = data.id;
    this.totalSeats = data.totalSeats;
    this.availableSeats = data.availableSeats;
    this.departureDateTime = data.departureDateTime;
    this.arrivalDateTime = data.arrivalDateTime;
    this.tourGuideId = data.tourGuideId;
    this.tourGuide = data.tourGuide;
    this.vehicleId = data.vehicleId;
    this.vehicle = data.vehicle;
    this.tourId = data.tourId;
    this.tour = data.tour;
    this.driverId = data.driverId;
    this.driver = data.driver;
    this.companyId = data.companyId;
    this.company = data.company;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
