import React from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const STATUS_LABELS = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
}

const STATUS_VARIANTS = {
  pending: 'secondary',
  approved: 'default',
  rejected: 'destructive',
}

const GeneralSalesManagement = ({
  data,
  pagination,
  setPagination,
  totalPages,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  onUpdateStatus,
}) => {
  const start = pagination.pageIndex * pagination.pageSize
  const end = start + pagination.pageSize
  const paginatedData = data.slice(start, end)

  return (
    <div className='space-y-4'>
      <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
        <Input
          placeholder='Search by code, customer or equipment'
          value={search}
          onChange={(e) => {
            setPagination((prev) => ({ ...prev, pageIndex: 0 }))
            setSearch(e.target.value)
          }}
          className='max-w-md'
        />

        <div className='w-full md:w-52'>
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setPagination((prev) => ({ ...prev, pageIndex: 0 }))
              setStatusFilter(value)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder='Filter by status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              <SelectItem value='pending'>Pending</SelectItem>
              <SelectItem value='approved'>Approved</SelectItem>
              <SelectItem value='rejected'>Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Equipment</TableHead>
              <TableHead>Advisor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className='font-medium'>{row.code}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.equipment}</TableCell>
                  <TableCell>{row.advisor}</TableCell>
                  <TableCell>S/ {row.amount.toLocaleString()}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANTS[row.status] || 'secondary'}>
                      {STATUS_LABELS[row.status] || row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => onUpdateStatus(row.id, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button
                        size='sm'
                        variant='destructive'
                        onClick={() => onUpdateStatus(row.id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className='h-24 text-center'>
                  No quotations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between'>
        <p className='text-sm text-muted-foreground'>
          Page {pagination.pageIndex + 1} of {Math.max(totalPages, 1)}
        </p>

        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            disabled={pagination.pageIndex === 0}
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: prev.pageIndex - 1,
              }))
            }
          >
            Previous
          </Button>

          <Button
            variant='outline'
            size='sm'
            disabled={pagination.pageIndex + 1 >= totalPages}
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: prev.pageIndex + 1,
              }))
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GeneralSalesManagement