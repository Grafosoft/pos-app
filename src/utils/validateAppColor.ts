interface Estructure {
  colorApp: string
  colorProduct: string
  colorComponent:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined
}

export const validateAppColor = (name: string) => {
  let object: Estructure = {
    colorApp: '',
    colorProduct: '',
    colorComponent: 'secondary'
  }

  switch (name) {
    case 'cuental':
      return (object = {
        colorApp: '#3C3F99',
        colorProduct: 'bg-purple-100',
        colorComponent: 'primary'
      })
      break
    case 'valual':
      return (object = {
        colorApp: '#00B4FF',
        colorProduct: 'bg-sky-100',
        colorComponent: 'primary'
      })
      break
    case 'otro':
      return (object = {
        colorApp: '',
        colorProduct: '',
        colorComponent: 'primary'
      })
      break
    default:
      return (object = {
        colorApp: '#00B4FF',
        colorProduct: 'bg-sky-100',
        colorComponent: 'primary'
      })
  }
  return object
}
