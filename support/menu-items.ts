import type {UserRolesEnum} from '~/enums/UserRolesEnum';

interface MenuItem {
    path: string
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
      path: '/client/home',
      label: 'Dashboard',
      icon: 'ic:baseline-house',
      children: [],
    },
    {
      path: '/client/companies',
      label: 'companies',
      icon: 'ic:baseline-house',
      children: [],
    },
    {
      label: 'financial',
      icon: 'ic:baseline-calculate',
      path: '/client/financial',
      children: [
        {
          path: '/client/financial/bank-accounts',
          label: 'bank_accounts',
          icon: 'ic:baseline-wallet',
        },
        {
          path: '/client/financial/balance',
          label: 'balance',
          icon: 'ic:baseline-balance',
        },
        {
          path: '/client/financial/payments-solicitations',
          label: 'payments_solicitations',
          icon: 'ic:baseline-payments',
        },
      ],
    },
    {
      label: 'transactions',
      icon: 'ic:baseline-pix',
      path: '/client/transactions',
      children: [
        {
          path: '/client/transactions/deposits',
          label: 'deposits',
          icon: 'ic:baseline-arrow-forward',
        },
        {
          path: '/client/transactions/saidas',
          label: 'Saídas',
          icon: 'ic:baseline-arrow-back',
        },
        {
          path: '/client/transactions/returns',
          label: 'returns',
          icon: 'ic:baseline-currency-exchange',
        },
        {
          path: '/client/transactions/refunds',
          label: 'refunds',
          icon: 'ic:baseline-currency-exchange',
        },
      ],
    },
    {
      label: 'explore',
      icon: 'ic:baseline-explore',
      path: '/client/explore',
      children: [
        {
          path: '/client/webhooks',
          label: 'Webhooks',
          icon: 'ic:baseline-send',
        },
        {
          path: '/client/configs',
          label: 'configs',
          icon: 'ic:baseline-engineering',
        },
      ],
    },
  ],
}

export default menuItems
