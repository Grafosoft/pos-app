import { type FC, useContext } from 'react'

import { Card, CardBody, Spacer } from '@nextui-org/react'

import { ShowPrices } from '@/utils/ShowPrices'
import { TruncateText } from '@/utils/TruncateText'
import { ProductContext } from '@/pages/[nameApp]'

import { ImageRound } from '../imageRound/ImageRound'
import { TbShoppingCartPlus } from 'react-icons/tb'
import { totalTaxPer } from '@/utils/totalPaxPer'
import { ModalEdit } from '../modals/ModalEdit'

// COMPONENT
export const ShoppingCardBody: FC = () => {
  // ProductContext
  const context = useContext(ProductContext)
  const { productList } = context

  return (
    <div className="w-full overflow-auto max-h-[50vh] min-h-[50vh] p-3 bg-[#F5F6FA] dark:bg-[#18181B]">
      {productList.length === 0 ? (
        <div className="w-full h-[44vh] flex flex-col  justify-center items-center">
          <TbShoppingCartPlus color="#A1A1AA" size={50} />
          <h1 className="mt-4 text-neutral-400  text-lg font-mono text-center">
            Aquí verás los productos que <br />
            elijas en tu próxima venta
          </h1>
        </div>
      ) : (
        productList.map((element, index) => {
          const discount = element.discount
          const tax = element.value * (totalTaxPer(element.tax) / 100)
          const total = element.value
          const subTotal = total - tax

          const arrayPrices = [
            {
              name: 'SubTotal: ',
              value: subTotal
            },
            {
              name: 'Descuento: ',
              value: discount
            },
            {
              name: 'Total Impuesto: ',
              value: tax
            },
            {
              name: 'Total: ',
              value: total
            }
          ]

          const arrayTax = []

          for (let index = 0; index < element.tax.length; index++) {
            const elementTax = element.tax[index]

            const taxObject = {
              name: `Impuesto (${elementTax.percentage}%): `,
              title: 'Total Impuesto: ',
              value: total * (elementTax.percentage / 100)
            }

            arrayTax.push(taxObject)
          }

          return (
            <Card className="mb-3" key={element.id}>
              <CardBody>
                <div className="flex justify-between  items-center">
                  <div className="flex gap-3">
                    <ImageRound
                      image={element.image}
                      name={element.item.name}
                      formeRound={false}
                    />
                    <div className="flex flex-col justify-around">
                      <p className="text-xl font-medium">
                        {TruncateText(element.item.name)}
                      </p>
                      <p className="text-small text-default-500">
                        {TruncateText(element.group.name)}
                      </p>
                      <div className="2xl:flex">
                        <ShowPrices arrayPrices={arrayPrices} total={total} />
                        <Spacer x={5} />
                        <ShowPrices arrayPrices={arrayTax} total={tax} />
                      </div>
                    </div>
                  </div>
                  <ModalEdit element={element} />
                </div>
              </CardBody>
            </Card>
          )
        })
      )}
    </div>
  )
}
