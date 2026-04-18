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
  businessName: '',
  document: '',
  contactName: '',
  phone: '',
  email: '',
  type: 'company',
}

const ModalNewCustomer = ({ isOpen, handleClose, onSave }) => {
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
    if (!form.businessName || !form.document || !form.contactName) return

    onSave(form)
    handleClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className='sm:max-w-[680px]'>
        <DialogHeader>
          <DialogTitle>Create New Customer</DialogTitle>
        </DialogHeader>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='businessName'>Business Name</Label>
            <Input
              id='businessName'
              value={form.businessName}
              onChange={(e) => handleChange('businessName', e.target.value)}
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
            <Label htmlFor='contactName'>Contact Name</Label>
            <Input
              id='contactName'
              value={form.contactName}
              onChange={(e) => handleChange('contactName', e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='phone'>Phone</Label>
            <Input
              id='phone'
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>

          <div className='space-y-2 md:col-span-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
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

export default ModalNewCustomer