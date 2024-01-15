import {UserRolesEnum} from '~/enums/UserRolesEnum';
import {VehicleTypesEnum} from '~/enums/VehicleTypesEnum';

interface Opt {
    value: string;
    label: string;
    icon?: string;
}

export const userRoles: Opt[] = [
  { value: UserRolesEnum.ADMIN, label: 'Administrador' },
  { value: UserRolesEnum.COMPANY_ADMIN, label: 'Administrador de empresa' },
  { value: UserRolesEnum.COMPANY_OPERATOR, label: 'Operador de empresa' },
];

export const companyUserRoles: Opt[] = [
  { value: UserRolesEnum.COMPANY_ADMIN, label: 'Administrador' },
  { value: UserRolesEnum.COMPANY_OPERATOR, label: 'Operador' },
];

export const vehicleTypes: Opt[] = [
  { value: VehicleTypesEnum.BUS, label: 'Ônibus' },
  { value: VehicleTypesEnum.HATCH, label: 'Hatch' },
  { value: VehicleTypesEnum.MINIBUS, label: 'Micro-ônibus' },
  { value: VehicleTypesEnum.MINIVAN, label: 'Minivan' },
  { value: VehicleTypesEnum.OTHER, label: 'Outro' },
  { value: VehicleTypesEnum.SEDAN, label: 'Sedan' },
  { value: VehicleTypesEnum.SPORTS, label: 'Esportivo' },
  { value: VehicleTypesEnum.SUV, label: 'SUV' },
  { value: VehicleTypesEnum.UTILITY, label: 'Utilitário' },
  { value: VehicleTypesEnum.VAN, label: 'Van' },
];
