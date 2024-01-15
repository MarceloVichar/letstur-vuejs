export const useFormattedDateTime = (date) => {
  return date ? useDayjs()(date).format('DD/MM/YYYY HH:mm') :  ''
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
  return data ? data.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') : ''
}

export const useFormattedLicensePlate = (data) => {
  return data && data?.length === 7 ? data.replace(/(\d{3})(\d{4})/, '$1-$2')?.toUpperCase() : data
}
