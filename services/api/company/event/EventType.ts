import type {CompanyType} from '~/services/api/shared/company/CompanyType';
import type {TourGuideType} from '~/services/api/company/records/tour-guide/TourGuideType';
import type {VehicleType} from '~/services/api/company/records/vehicle/VehicleType';
import type {TourType} from '~/services/api/company/records/tour/TourType';
import type {DriverType} from '~/services/api/company/records/driver/DriverType';

export interface EventType {
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
}
