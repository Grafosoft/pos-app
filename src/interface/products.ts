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

export interface ProductList {
  id: number
  name: string
  image: string | null
  groupName: string
  salePrice: number
  amountPrice: number
  discount: number
  taxValue: number
  total: number
}
