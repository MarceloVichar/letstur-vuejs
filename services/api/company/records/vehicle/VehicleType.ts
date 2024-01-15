import type {CompanyType} from '~/services/api/shared/company/CompanyType';

export interface VehicleType {
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
}
