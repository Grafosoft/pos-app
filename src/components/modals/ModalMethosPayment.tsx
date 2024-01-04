/* import { Button } from '@nextui-org/react'
import { type FC } from 'react'
import { RiAddFill } from 'react-icons/ri'
import { PaymentArray } from './ModalBill';

export const ModalMethodPayment: FC = ({PaymentArray}) => {
  return (
    <>
      <div className="p-2">
        <div className="flex justify-between">
          <p>Metodos de Pago</p>
          <Button
            size="sm"
            onClick={handlerAddPaymentMethod}
            variant="flat"
            isIconOnly
            color="success"
          >
            <RiAddFill size={17} />
          </Button>
        </div>
        <div className="overflow-scroll max-h-[180px]">
          {paymentArray.map(
            (element, index) =>
              parametersInfo.paymentMethods.length !== 0 && (
                <PaymentRow
                  paymentArray={paymentArray}
                  elementPayment={element}
                  setPaymentArray={setPaymentArray}
                  key={index}
                />
              )
          )}
        </div>
      </div>
    </>
  )
}
 */
