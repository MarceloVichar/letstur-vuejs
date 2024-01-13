import {UserRolesEnum} from '~/enums/UserRolesEnum';

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
