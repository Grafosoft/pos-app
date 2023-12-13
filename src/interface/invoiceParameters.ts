import { type Tax } from './products'

export interface InvoiceParameters {
  companyId: number
  companyName: string
  description: string
  numerations: Tax[]
  warehouses: Tax[]
  sellers: Tax[]
  paymentMethods: PaymentMethod[]
  currencies: Currency[]
}

export interface Currency {
  id: string
  code: string
}

export interface ParameterInterface {
  id: number
  name: string
  authorization?: null
  value?: number
  percentage?: number
}

export interface Numeration {
  id: number
  name: string
  authorization: null
}

export interface PaymentMethod {
  id: string
  name: string
}

export interface Seller {
  id: number
  name: string
}

export interface SelectTax {
  id: number
  name: string
  value: number
  percentage: number
}
