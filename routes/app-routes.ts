interface Route {
    path: string
    label: string
    icon?: string
    children?: Route[]
}
export const adminRoutes: Route[] = [
  {
    path: '/admin/home',
    label: 'Dashboard',
    icon: 'ic:baseline-house',
    children: [],
  },
  {
    label: 'registers',
    icon: 'ic:baseline-featured-play-list',
    path: '/admin/registers',
    children: [
      {
        path: '/admin/registers/admins',
        label: 'Admins',
        icon: 'ic:baseline-admin-panel-settings',
      },
      {
        path: '/admin/registers/clients',
        label: 'Clients',
        icon: 'ic:sharp-people',
      },
      {
        path: '/admin/registers/companies',
        label: 'Companies',
        icon: 'ic:baseline-business-center',
      },
    ],
  },
  {
    label: 'Financial',
    icon: 'ic:baseline-calculate',
    path: '/admin/financial',
    children: [
      {
        path: '/admin/financial/bank-accounts',
        label: 'Bank_accounts',
        icon: 'ic:baseline-wallet',
      },
      {
        path: '/admin/financial/saldos',
        label: 'Balances',
        icon: 'ic:baseline-balance',
      },
      {
        path: '/admin/financial/plans',
        label: 'Plans',
        icon: 'ic:baseline-fact-check',
      },
      {
        path: '/admin/financial/payments-solicitations',
        label: 'Payments_solicitations',
        icon: 'ic:baseline-payments',
      },
    ],
  },
  {
    label: 'Transactions',
    icon: 'ic:baseline-pix',
    path: '/admin/transacoes',
    children: [
      {
        path: '/admin/transacoes/entradas',
        label: 'deposits',
        icon: 'ic:baseline-arrow-forward',
      },
      {
        path: '/admin/transacoes/saidas',
        label: 'payments',
        icon: 'ic:baseline-arrow-back',
      },
      {
        path: '/admin/transacoes/devolucoes',
        label: 'returns',
        icon: 'ic:baseline-currency-exchange',
      },
      {
        path: '/admin/transacoes/estornos',
        label: 'refunds',
        icon: 'ic:baseline-currency-exchange',
      },
    ],
  },
  {
    label: 'support',
    icon: 'ic:baseline-info',
    path: '/admin/suporte',
    children: [
      {
        path: '/admin/suporte/genial',
        label: 'Genial_bank',
        icon: 'ic:baseline-account-balance',
      },
      {
        path: '/admin/suporte/zro-bank',
        label: 'Zro_Bank',
        icon: 'ic:baseline-account-balance',
      },
    ],
  },
  {
    label: 'explore',
    icon: 'ic:baseline-explore',
    path: '/admin/explorar',
    children: [
      {
        path: '/admin/webhooks',
        label: 'Webhooks',
        icon: 'ic:baseline-send',
      },
      {
        path: '/admin/configuracoes',
        label: 'configs',
        icon: 'ic:baseline-engineering',
      },
    ],
  },
]

export const clientRoutes: Route[] = [
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
]
