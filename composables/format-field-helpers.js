export const useFormattedDateTime = (date) => {
  return date ? useDayjs()(date).format('DD/MM/YYYY HH:mm') :  ''
}

export const useFormattedDate = (date) => {
  return date ? useDayjs()(date).format('DD/MM/YYYY') :  ''
}

export const useFormattedDocument = (data) => {
  switch (data?.length) {
    case 11:
      return useFormattedCpf(data)
    case 14:
      return useFormattedCnpj(data)
    default:
      return data
  }
}

export const useFormattedCpf = (data) => {
  return data ? data.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : ''
}

export const useFormattedCnpj = (data) => {
  return data ? data.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') : ''
}

export const useFormattedPhone = (data) => {
  if (data?.length === 10) {
    return data.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (data?.length === 11) {
    return data.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  return data;
}

export const useFormattedLicensePlate = (data) => {
  return data && data?.length === 7 ? data.replace(/([A-Za-z]{3})([A-Za-z0-9])(\d{3})/, '$1-$2$3')?.toUpperCase() : data
}

export const useFormattedRealMoney = (value, cents = true) => {
  if (typeof value !== 'number') {
    return value;
  }
  const realValue = cents ? value / 100 : value;
  return realValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
