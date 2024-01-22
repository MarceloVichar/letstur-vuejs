import type {CompanyType} from '~/services/api/shared/company/CompanyType';
import type {UserType} from '~/services/api/shared/users/UserType';
import type {EventType} from '~/services/api/company/event/EventType';

export interface CostumerType {
    name?: string;
    email?: string;
    phone?: string;
    document?: string;
}

export interface passengerType {
    name?: string;
    document?: string;
}

export interface EventSaleType {
    quantity?: number;
    totalValueCents?: number;
    passengers?: passengerType[];
    event: EventType;
}

export interface SaleType {
    id: number;
    customer?: CostumerType;
    status?: string;
    voucher?: string;
    totalValueCents?: number;
    sellerId?: number;
    seller?: UserType;
    events?: EventSaleType[];
    companyId?: number;
    company?: CompanyType;
    createdAt?: string;
    updatedAt?: string;
}
