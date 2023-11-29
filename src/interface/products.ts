export interface interfaceProduct {
  barcode: string
  code: string
  costPrice: number
  group: Group
  id: number
  image: null | string
  isActive: boolean
  isAiu: boolean
  isInventory: boolean
  name: string
  salePrice: number
  tax: Tax
  wooCode: number
}

export interface Group {
  id: number
  name: string
}

export interface Tax {
  id: number
  name: string
  value: number
}
