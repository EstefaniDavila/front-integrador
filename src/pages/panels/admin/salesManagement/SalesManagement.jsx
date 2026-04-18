import React, { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TbPlus } from 'react-icons/tb'
import ModalNewQuotation from './modals/ModalNewQuotation'
import GeneralSalesManagement from './tables/GeneralSalesManagement'
const fakeQuotations = {
  rows: [
    {
      id: 1,
      code: 'QT-001',
      customer: 'Constructora Lima SAC',
      document: '20601234567',
      equipment: 'Excavadora CAT 320',
      advisor: 'Juan Pérez',
      amount: 185000,
      status: 'pending',
      date: '2026-04-15',
    },
    {
      id: 2,
      code: 'QT-002',
      customer: 'Minera Andina',
      document: '20555666777',
      equipment: 'Cargador Frontal Komatsu WA380',
      advisor: 'Carlos Ramírez',
      amount: 260000,
      status: 'approved',
      date: '2026-04-16',
    },
    {
      id: 3,
      code: 'QT-003',
      customer: 'Obras del Sur',
      document: '10456789123',
      equipment: 'Retroexcavadora JCB 3CX',
      advisor: 'Luis Torres',
      amount: 145000,
      status: 'rejected',
      date: '2026-04-17',
    },
  ],
  rowCount: 3,
}

const SalesManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [quotations, setQuotations] = useState(fakeQuotations.rows)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [search, setSearch] = useState('')
  const [searchFields, setSearchFields] = useState(['code', 'customer', 'equipment'])
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredData = useMemo(() => {
    const term = search.trim().toLowerCase()

    return quotations.filter((item) => {
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter

      if (!term) return matchesStatus

      const matchesSearch =
        item.code.toLowerCase().includes(term) ||
        item.customer.toLowerCase().includes(term) ||
        item.equipment.toLowerCase().includes(term)

      return matchesStatus && matchesSearch
    })
  }, [quotations, search, statusFilter])

  const totalPages = Math.ceil(filteredData.length / pagination.pageSize) || 0

  const handleCreateQuotation = (newQuotation) => {
    setQuotations((prev) => [
      {
        id: Date.now(),
        ...newQuotation,
      },
      ...prev,
    ])
  }

  const handleUpdateStatus = (quotationId, status) => {
    setQuotations((prev) =>
      prev.map((item) =>
        item.id === quotationId ? { ...item, status } : item
      )
    )
  }

  return (
    <>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-1'>
        <Card className='col-span-1 lg:col-span-1'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle>Sales Management</CardTitle>

            <Button onClick={() => setIsModalOpen(true)}>
              <TbPlus className='mr-2 h-4 w-4' />
              New Quotation
            </Button>
          </CardHeader>

          <CardContent>
            <GeneralSalesManagement
              data={filteredData}
              pagination={pagination}
              setPagination={setPagination}
              totalPages={totalPages}
              search={search}
              setSearch={setSearch}
              searchFields={searchFields}
              setSearchFields={setSearchFields}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onUpdateStatus={handleUpdateStatus}
            />
          </CardContent>
        </Card>
      </div>

      <ModalNewQuotation
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        onSave={handleCreateQuotation}
      />
    </>
  )
}

export default SalesManagement