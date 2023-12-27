export interface EstructureColor {
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
  let object: EstructureColor = {
    colorApp: '',
    colorProduct: '',
    colorComponent: 'secondary'
  }

  switch (name) {
    case 'cuental':
      return (object = {
        colorApp: 'rgba(60,63,153,1)',
        colorProduct: 'rgb(243, 232, 255)',
        colorComponent: 'primary'
      })
      break
    case 'valual':
      return (object = {
        colorApp: 'rgba(0,180,255,1)',
        colorProduct: 'rgba(0,180,255,0.2)',
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
        colorApp: 'rgba(0,180,255,1)',
        colorProduct: 'rgba(0,180,255,0.2)',
        colorComponent: 'primary'
      })
  }
  return object
}
