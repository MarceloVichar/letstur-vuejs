import type {CompanyType} from '~/services/api/shared/company/CompanyType';
import type {LocaleType} from '~/services/api/company/records/locale/LocaleType';
import type {TourTypeType} from '~/services/api/company/records/tour-type/TourTypeType';

export interface TourType {
    id: number;
    name: string;
    roundTrip: number;
    priceCents: number;
    note?: string;
    localeId?: number;
    locale?: LocaleType;
    tourTypeId?: number;
    tourType?: TourTypeType;
    companyId?: number;
    company?: CompanyType;
    createdAt?: string;
    updatedAt?: string;
}
