import React, { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TbPlus } from 'react-icons/tb'
import ModalNewCustomer from './modals/ModalNewCustomer'
import GeneralCustomerManagement from './tables/GeneralCustomerManagement'
const fakeCustomers = {
  rows: [
    {
      id: 1,
      businessName: 'Constructora Lima SAC',
      document: '20601234567',
      contactName: 'María Torres',
      phone: '987654321',
      email: 'contacto@constructoralima.com',
      type: 'company',
    },
    {
      id: 2,
      businessName: 'Minera Andina',
      document: '20555666777',
      contactName: 'Carlos Rojas',
      phone: '912345678',
      email: 'ventas@mineraandina.com',
      type: 'company',
    },
  ],
}

const CustomerManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [customers, setCustomers] = useState(fakeCustomers.rows)
  const [search, setSearch] = useState('')

  const filteredData = useMemo(() => {
    const term = search.trim().toLowerCase()

    if (!term) return customers

    return customers.filter(
      (item) =>
        item.businessName.toLowerCase().includes(term) ||
        item.document.toLowerCase().includes(term) ||
        item.contactName.toLowerCase().includes(term)
    )
  }, [customers, search])

  const handleCreateCustomer = (newCustomer) => {
    setCustomers((prev) => [{ id: Date.now(), ...newCustomer }, ...prev])
  }

  return (
    <>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-1'>
        <Card className='col-span-1 lg:col-span-1'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle>Customer Management</CardTitle>

            <Button onClick={() => setIsModalOpen(true)}>
              <TbPlus className='mr-2 h-4 w-4' />
              New Customer
            </Button>
          </CardHeader>

          <CardContent>
            <GeneralCustomerManagement
              data={filteredData}
              search={search}
              setSearch={setSearch}
            />
          </CardContent>
        </Card>
      </div>

      <ModalNewCustomer
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        onSave={handleCreateCustomer}
      />
    </>
  )
}

export default CustomerManagement