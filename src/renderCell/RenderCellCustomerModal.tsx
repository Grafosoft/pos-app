import { type CustomerList } from '@/interface/customers'
import { Chip, User } from '@nextui-org/react'
import React, { useContext, type FC, type Key } from 'react'
import { TbArrowBigRightLineFilled } from 'react-icons/tb'
import { UrlContext } from '@/pages/[nameApp]'


interface Props {
  customer: CustomerList
  columnKey: Key
  closeHandler: () => void
  setCustomerSearch: (inititalState: { id: number; name: string }) => void
}

export const RenderCellCustomerModal: FC<Props> = ({
  customer,
  columnKey,
  closeHandler,
  setCustomerSearch
}) => {
  const fullName = `${customer.commercialName}  ${customer.firstName} ${customer.middleName} ${customer.firstSurname} ${customer.secondSurname}`
  // import Context UrlContext
  const { color } = useContext(UrlContext);


  const handleSaveCustomer = () => {
    setCustomerSearch({
      id: parseInt(customer.id.toString()),
      name: fullName
    })
    closeHandler()
  }

  switch (columnKey) {
    case 'name':
      return (
        <User
          name={fullName}
          description={`${customer.identificationType.code} ${customer.identification}`}
        />
      )

    case 'status':
      return (
        <Chip color={customer.isActive ? 'success' : 'danger'} variant="flat">
          {customer.isActive ? 'Activo' : 'Inactivo'}
        </Chip>
      )

    case 'city':
      return <p>{customer.city.name}</p>

    case 'action':
      return (
        <TbArrowBigRightLineFilled
          color={color.colorApp}
          cursor="pointer"
          onClick={handleSaveCustomer}
        />
      )

    default:
      break
  }
}
