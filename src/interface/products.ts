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
  salePrice: number // precio base que nunca cambia del producto
  amountPrice: number  // precio del producto multiplicado por la cantidad de productos pedidos
  discount: number  // decuento del producto
  taxValue: number  // valor del impuesto del producto en porcentaje
  total: number   // valor total del producto despues de restar y sumar los valores anteriores
}
