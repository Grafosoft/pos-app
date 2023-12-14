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

export interface ProductList {
  id: number
  quantity: number
  value: number // precio del producto multiplicado por la cantidad de productos pedidos
  price: number // precio base que nunca cambia del producto
  discount: number // decuento del producto
  description: string
  discountAmount: number
  totalAmount: number // valor total del producto despues de restar y sumar los valores anteriores
  item: Group
  tax: Tax[]
  paymentMethod: Group
  image: string | null
  group: Group
}

export interface Group {
  id: number
  name: string
}

export interface Tax {
  id: number
  name: string
  value?: number // valor del impuesto del producto en porcentaje
  percentage?: number
  authorization?: null
}
