const accountFormFields = {
  'accountForm.accountCustomer.externalCode': 'código',
  'accountForm.accountCustomer.internalCode': 'Identificador de empresa',
  'accountForm.accountCustomer.personName': 'nome',
  'accountForm.accountCustomer.email': 'email',
  'accountForm.accountCustomer.phone': 'telefone',
  'accountForm.accountCustomer.cellphone': 'celular',
  'accountForm.accountCustomer.rg': 'RG',
  'accountForm.accountCustomer.birthDate': 'data de nascimento',
  'accountForm.accountCustomer.cpf': 'CPF',
  'accountForm.accountCustomer.cnpj': 'CNPJ',
  'accountForm.accountCustomer.companyName': 'razão social',
  'accountForm.accountCustomer.tradingName': 'nome fantasia',
  'accountForm.accountCustomer.municipalRegistration': 'inscrição municipal',
  'accountForm.accountCustomer.stateRegistration': 'inscrição estadual',
  'accountForm.accountCustomer.segment': 'segmento',
  'accountForm.accountCustomer.address.zipCode': 'CEP',
  'accountForm.accountCustomer.address.street': 'rua',
  'accountForm.accountCustomer.address.number': 'número',
  'accountForm.accountCustomer.address.neighborhood': 'bairro',
  'accountForm.accountCustomer.address.complement': 'complemento',
  'accountForm.accountCustomer.address.stateAbbr': 'estado',
  'accountForm.accountCustomer.address.cityName': 'cidade',
  'accountForm.accountBillingData.personName': 'nome',
  'accountForm.accountBillingData.email': 'email',
  'accountForm.accountBillingData.emailSecondary': 'email 2',
  'accountForm.accountBillingData.phone': 'contato 1',
  'accountForm.accountBillingData.phoneSecondary': 'contato 2',
  'accountForm.accountBillingData.cellphone': 'Contato 1 (Telefone ou celular)',
  'accountForm.accountBillingData.cellphoneSecondary': 'Contato 2 (Telefone ou celular)',
  'accountForm.accountBillingData.rg': 'RG',
  'accountForm.accountBillingData.cpf': 'CPF',
  'accountForm.accountBillingData.cnpj': 'CNPJ',
  'accountForm.accountBillingData.companyName': 'razão social',
  'accountForm.accountBillingData.tradingName': 'nome fantasia',
  'accountForm.accountBillingData.municipalRegistration': 'inscrição municipal',
  'accountForm.accountBillingData.stateRegistration': 'inscrição estadual',
  'accountForm.accountBillingData.birthDate': 'data de nascimento',
  'accountForm.accountBillingData.observations': 'observações',
  'accountForm.accountBillingData.address.zipCode': 'CEP',
  'accountForm.accountBillingData.address.street': 'rua',
  'accountForm.accountBillingData.address.number': 'número',
  'accountForm.accountBillingData.address.neighborhood': 'bairro',
  'accountForm.accountBillingData.address.complement': 'complemento',
  'accountForm.accountBillingData.address.stateAbbr': 'estado',
  'accountForm.accountBillingData.address.cityName': 'cidade',
  'accountForm.userData.name': 'name',
  'accountForm.userData.email': 'email',
  'accountForm.userData.password': 'senha',
  'accountForm.userData.password_confirmation': 'confirmar senha',
}

const UserFormFields = {
  'userForm.accountId': 'conta associada',
  'userForm.name': 'nome',
  'userForm.email': 'email',
  'userForm.password': 'senha',
  'userForm.password_confirmation': 'confirmar senha',
}

const licenseFormFields = {
  'licenseForm.accountId': 'conta',
  'licenseForm.purchasedAt': 'data de aquisição',
  'licenseForm.expiresAt': 'data de expiração',
  'licenseForm.licenseTypeId': 'tipo de licença',
  'licenseForm.numberUsers': 'quantidade de usuarios',
  'licenseForm.origin': 'origem',
  'licenseForm.shareLimit': 'limite de compartilhamento',
}

const commercialDynamicForm = {
  'commercialDynamicForm.name': 'nome da campanha',
  'commercialDynamicForm.fields': 'campos da campanha',
}

const themeForm = {
  'themeForm.name': 'nome',
  'themeForm.campaignId': 'grupo',
  'themeForm.image': 'imagem',
  'themeForm.formatId': 'formato',
}

const licenseTypeForm = {
  'licenseTypeForm.type': 'tipo de lincença',
  'licenseTypeForm.formats': 'formatos',
}

const packageForm = {
  'packageForm.code': 'código',
  'packageForm.title': 'título',
  'packageForm.packageType': 'tipo de produto',
  'packageForm.shareLimit': 'limite de compartilhamento',
  'packageForm.priceInCents': 'preço',
  'packageForm.upsellTemplateIds': 'coordenadas',
  'packageForm.themeIds': 'temas',
  'packageForm.licenseTypeId': 'tipo de licença',
  'packageForm.numberOfDaysToExpire': 'dias para expirar',
}

const campaignForm = {
  'campaignForm.name' : 'nome',
  'campaignForm.image' : 'imagem',
  'campaignForm.formatId' : 'formato do papel',
}

const productForm = {
  'productForm.code': 'código',
  'productForm.mainDescription': 'descrição principal',
  'productForm.secondaryDescription': 'descrição secundária',
  'productForm.unitName': 'unidade',
  'productForm.brandName': 'marca',
  'productForm.departmentName': 'departamento',
  'productForm.priceCents': 'preço',
  'productForm.promotionalPriceCents': 'preço promocional',
  'productForm.validFrom': 'valido de',
  'productForm.validUntil': 'válido até',
  'productForm.validPromotionalFrom': 'válido de promocional',
  'productForm.validPromotionalUntil': 'válido até promocional',
  'productForm.validWholesaleFrom': 'válido de atacado',
  'productForm.validWholesaleUntil': 'válido até atacado',
}

const loginData = {
  'loginData.email': 'email',
  'loginData.password': 'senha',
}

const forgotPasswordForm = {
  'forgotPasswordForm.email': 'email',
}

const resetPasswordForm = {
  'resetPasswordForm.token': 'token',
  'resetPasswordForm.email': 'email',
  'resetPasswordForm.password': 'nova senha',
  'resetPasswordForm.password_confirmation': 'confirmar senha',
}

const twoFactorChallengeForm = {
  'twoFactorChallengeForm.code': 'código',
  'twoFactorChallengeForm.recovery_code': 'Código de recuperação',
}

const passwordForm = {
  'profileForm.name': 'nome',
  'profileForm.email': 'email',
}

const profileForm = {
  'profileForm.current_password': 'senha atual',
  'profileForm.password': 'nova senha',
  'profileForm.password_confirmation': 'confirmar senha',
}

const confirm2FAForm = {
  'confirm2FAForm.code': 'código',
}

const formatForm = {
  'formatForm.code': 'código',
  'formatForm.name': 'nome',
  'formatForm.height': 'comprimento',
  'formatForm.width': 'largura',
  'formatForm.type': 'tipo',
  'formatForm.orientation': 'orientação',
  'formatForm.measuringUnit': 'unidade de medida',
}

const authBackgroundForm = {
  'authBackgroundForm.imageType': 'tipo de imagem',
  'authBackgroundForm.image': 'imagem',
}

export default {
  ...accountFormFields,
  ...UserFormFields,
  ...licenseFormFields,
  ...commercialDynamicForm,
  ...themeForm,
  ...licenseTypeForm,
  ...packageForm,
  ...campaignForm,
  ...productForm,
  ...loginData,
  ...forgotPasswordForm,
  ...resetPasswordForm,
  ...twoFactorChallengeForm,
  ...passwordForm,
  ...profileForm,
  ...confirm2FAForm,
  ...formatForm,
  ...authBackgroundForm,
}
