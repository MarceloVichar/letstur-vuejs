import {defineRule, configure, Form, Field} from 'vee-validate';
import {required, email} from '@vee-validate/rules';
import {localize, setLocale} from '@vee-validate/i18n'
import pt_BR from '@vee-validate/i18n/dist/locale/pt_BR.json';
import formsFieldNames from '~/support/formsFieldNames';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VeeForm', Form)
  nuxtApp.vueApp.component('VeeField', Field)

  defineRule('required', required);
  defineRule('email', email);

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
