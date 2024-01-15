import {defineRule, configure, Form, Field} from 'vee-validate';
import {required, email, min, max, confirmed, min_value, max_value} from '@vee-validate/rules';
import {localize, setLocale} from '@vee-validate/i18n'
import pt_BR from '@vee-validate/i18n/dist/locale/pt_BR.json';
import formsFieldNames from '~/support/formsFieldNames';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VeeForm', Form)
  nuxtApp.vueApp.component('VeeField', Field)

  defineRule('required', required);
  defineRule('email', email);
  defineRule('min', min);
  defineRule('max', max);
  defineRule('confirmed', confirmed);
  defineRule('min_value', min_value);
  defineRule('max_value', max_value);

  defineRule('strongPassword', value => {
    if (!value || !value.length) {
      return true;
    }

    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,22}$/.test(value)) {
      return 'A senha deve ser mais forte';
    }

    return true
  });

  defineRule('mindate', (value = '', [target] = '') => {
    if(!value || !target)
      return true;

    const dateFrom = target.replace( /(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3');
    const dateTo = value.replace( /(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3');

    if (new Date(dateTo) > new Date(dateFrom)) {
      return true;
    }
    return 'A data final deve ser posterior a data de início.';
  });
});

defineRule('cnpj', value => {
  if (!value) {
    return true;
  }

  if (!/^\d{14}$/.test(value)) {
    return 'O CNPJ informado é inválido';
  }

  return true
})

defineRule('document', value => {
  if (!value) {
    return true;
  }

  if (!/^\d{11}$|^\d{14}$/.test(value)) {
    return 'O documento informado é inválido';
  }

  return true
})

defineRule('phone', value => {
  if (!value) {
    return true;
  }

  if (!/^\d+$/.test(value)) {
    return 'O telefone deve conter apenas dígitos';
  }

  if (value.length < 10 || value.length > 11) {
    return 'O telefone deve ter entre 10 e 11 dígitos';
  }

  return true;
});

defineRule('licensePlate', value => {
  if (!value) {
    return true;
  }

  if (!/^[a-zA-Z]{3}\d[a-zA-Z0-9]\d{2}$/.test(value)) {
    return 'Placa inválida';
  }

  return true
})

localize({pt_BR});

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
  generateMessage: localize('pt_BR', {
    names: formsFieldNames,
  }),
});

setLocale('pt_BR')
