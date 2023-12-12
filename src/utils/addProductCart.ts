import { type interfaceProduct, type ProductList } from '@/interface/products'
import { type Dispatch, type SetStateAction } from 'react'
import { totalTaxPer } from './totalPaxPer'

export const addProductCart = (
  productList: ProductList[],
  setProductList: Dispatch<SetStateAction<ProductList[]>>,
  product: interfaceProduct
) => {
  const productExis = productList.find(element => element.id === product.id)

  if (!productExis) {
    setProductList([
      ...productList,
      {
        id: product.id,
        quantity: 1,
        value: product.salePrice,
        price: product.salePrice,
        discount: 0,
        description: '',
        discountAmount: 0,
        totalAmount:
          product.salePrice + product.salePrice * (product.tax.value / 100),
        item: {
          id: product.id,
          name: product.name
        },
        tax: [
          {
            id: product.tax.id,
            name: product.tax.name,
            value: 0,
            percentage: product.tax.value
          }
        ],
        image: product.image,
        group: {
          id: product.group.id,
          name: product.group.name
        }
      }
    ])
  } else {
    const validId = (element: ProductList) => element.id === product.id
    const indexFilterProduct = productList.findIndex(validId)

    const arrayEdit = productList.map((element, index) => {
      if (index === indexFilterProduct) {
        element.quantity = element.quantity + 1
        element.value = element.price * element.quantity
        element.totalAmount =
          element.value * (totalTaxPer(element.tax) / 100) + element.value
      }

      return element
    })

    setProductList(arrayEdit)
  }
}
