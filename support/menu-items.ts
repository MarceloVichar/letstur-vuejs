import type {UserRolesEnum} from '~/enums/UserRolesEnum';

interface MenuItem {
    path?: string
    label: string
    icon?: string
    role?: UserRolesEnum[]|UserRolesEnum
    permission?: string[]|string
    children?: MenuItem[]
}

interface MenuItems {
  admin: MenuItem[];
  company: MenuItem[];
}

const menuItems: MenuItems = {
  admin: [
    {
      path: '/admin/home',
      label: 'Home',
      icon: 'ic:baseline-house',
    },
    {
      path: '/admin/companies',
      label: 'Empresas',
      icon: 'mdi:office-building',
    },
    {
      path: '/admin/users',
      label: 'Usuários',
      icon: 'ph:users-fill',
    },
  ],
  company: [
    {
      path: '/company/home',
      label: 'Dashboard',
      icon: 'ic:baseline-house',
    },
    {
      path: '/company/users',
      label: 'Usuários',
      icon: 'ph:users-fill',
      permission: 'users view any',
    },
    {
      label: 'Eventos',
      icon: 'ic:baseline-explore',
      path: '/company/events',
      permission: 'events view any',
    },
    {
      path: '/company/sales',
      label: 'Vendas',
      icon: 'ic:baseline-house',
      permission: 'sales view any',
    },
    {
      path: '/company/calendar',
      label: 'Calendário',
      icon: 'ic:baseline-house',
      permission: 'events view any',
    },
    {
      label: 'Passeios',
      icon: 'ic:baseline-house',
      children: [
        {
          path: '/company/records/tours',
          label: 'Ver passeios',
          icon: 'ic:baseline-house',
          permission: 'tours view any',
        },
        {
          path: '/company/records/tour-types',
          label: 'Tipos de passeios',
          icon: 'ic:baseline-house',
          permission: 'tour-types view any',
        },
        {
          path: '/company/records/locales',
          label: 'Locais',
          icon: 'ic:baseline-house',
          permission: 'locales view any',
        },
      ],
    },
    {
      label: 'Cadastros',
      icon: 'ic:baseline-house',
      children: [
        {
          path: '/company/records/vehicles',
          label: 'Veículos',
          icon: 'ic:baseline-house',
          permission: 'vehicles view any',
        },
        {
          path: '/company/records/drivers',
          label: 'Motoristas',
          icon: 'ic:baseline-house',
          permission: 'drivers view any',
        },
        {
          path: '/company/records/tour-guides',
          label: 'Guias de passeio',
          icon: 'ic:baseline-house',
          permission: 'tour-guides view any',
        },
      ],
    },
  ],
}

export default menuItems
