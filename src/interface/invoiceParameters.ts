export interface InvoiceParameters {
  companyId: number
  companyName: string
  description: string
  numerations: Numeration[]
  warehouses: Seller[]
  sellers: Seller[]
  paymentMethods: PaymentMethod[]
  currencies: Currency[]
}

export interface Currency {
  id: string
  code: string
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
