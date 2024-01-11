import {defineStore} from 'pinia'
export const useFinancial = defineStore('financial', {
  state: () => {
    return {
      banks: ['Banco Genial', 'Zro Bank'],
      bankAccountTypes: [
        {key: 'CACC', label: 'CACC'},
        {key: 'checking account', label: 'Conta Corrente'},
        {key: 'payment account', label: 'Conta Pagamento'},
        {key: 'savings account', label: 'Conta Poupança'},
        {key: 'salary account', label: 'Conta Salário'},
      ],
      pixKeyTypes: [
        {key: 'cpf', label: 'CPF'},
        {key: 'cnpj', label: 'CNPJ'},
        {key: 'email', label: 'E-mail'},
        {key: 'phone', label: 'Telefone'},
        {key: 'evp', label: 'EVP'},
      ],
    }
  },
})
