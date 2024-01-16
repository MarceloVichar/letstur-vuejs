import type {CompanyType} from '~/services/api/shared/company/CompanyType';

export interface LocaleType {
    id: number;
    name: string;
    zipCode?: string;
    street?: string;
    number?: string;
    complement?: string;
    district?: string;
    city?: string;
    uf?: string;
    responsibleName?: string;
    responsiblePhone?: string;
    companyId?: number;
    company: CompanyType;
    createdAt?: string;
    updatedAt?: string;
}
