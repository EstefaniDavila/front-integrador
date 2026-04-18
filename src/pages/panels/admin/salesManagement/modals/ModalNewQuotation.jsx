import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

const initialState = {
  code: '',
  customer: '',
  document: '',
  equipment: '',
  advisor: '',
  amount: '',
  date: '',
  status: 'pending',
}

const ModalNewQuotation = ({ isOpen, handleClose, onSave }) => {
  const [form, setForm] = useState(initialState)

  useEffect(() => {
    if (!isOpen) {
      setForm(initialState)
    }
  }, [isOpen])

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (!form.code || !form.customer || !form.equipment || !form.amount || !form.date) {
      return
    }

    onSave({
      ...form,
      amount: Number(form.amount),
    })

    handleClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className='sm:max-w-[680px]'>
        <DialogHeader>
          <DialogTitle>Create New Quotation</DialogTitle>
        </DialogHeader>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='code'>Quotation Code</Label>
            <Input
              id='code'
              value={form.code}
              onChange={(e) => handleChange('code', e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='customer'>Customer</Label>
            <Input
              id='customer'
              value={form.customer}
              onChange={(e) => handleChange('customer', e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='document'>Document</Label>
            <Input
              id='document'
              value={form.document}
              onChange={(e) => handleChange('document', e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='equipment'>Equipment</Label>
            <Input
              id='equipment'
              value={form.equipment}
              onChange={(e) => handleChange('equipment', e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='advisor'>Advisor</Label>
            <Input
              id='advisor'
              value={form.advisor}
              onChange={(e) => handleChange('advisor', e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='amount'>Amount</Label>
            <Input
              id='amount'
              type='number'
              value={form.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
            />
          </div>

          <div className='space-y-2 md:col-span-2'>
            <Label htmlFor='date'>Date</Label>
            <Input
              id='date'
              type='date'
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ModalNewQuotation