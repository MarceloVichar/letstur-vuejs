import type {CompanyType} from '~/services/api/shared/company/CompanyType';
import type {LocaleType} from '~/services/api/company/records/locale/LocaleType';
import type {TourTypeType} from '~/services/api/company/records/tour-type/TourTypeType';
import type {TourType} from '~/services/api/company/records/tour/TourType';

export class TourData {
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

  constructor(data: TourType) {
    this.id = data.id;
    this.name = data.name;
    this.roundTrip = data.roundTrip;
    this.priceCents = data.priceCents;
    this.note = data.note;
    this.localeId = data.localeId;
    this.locale = data.locale;
    this.tourTypeId = data.tourTypeId;
    this.tourType = data.tourType;
    this.companyId = data.companyId;
    this.company = data.company;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
