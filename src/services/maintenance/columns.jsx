import React from 'react'
import GeneralTooltip from '@/helpers/generalTooltip'
import { TbEdit } from 'react-icons/tb'
import { TbTrash } from 'react-icons/tb'

const columns = (handleDelete, handleUpdate) => [
  {
    accessorKey: 'code',
    header: 'Código',
    cell: info => info.getValue(),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'equipment',
    header: 'Equipo',
    cell: info => info.getValue(),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'maintenance_type',
    header: 'Tipo de Mantenimiento',
    cell: info => info.getValue(),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'technician',
    header: 'Técnico',
    cell: info => info.getValue(),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'date',
    header: 'Fecha',
    cell: info => info.getValue(),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: info => info.getValue(),
    enableColumnFilter: true,
  },
  {
    header: 'Acciones',
    cell: ({ row }) => (
      <div className='flex space-x-4'>
        <GeneralTooltip
          content='Editar Categoria'
          triggerContent={
            <span className='bg-yellow-500 text-white rounded-full p-1'>
              <TbEdit size={20}/>
            </span>
          }
          onClick={()=> handleUpdate(row?.original, 'edit')}
        />
        <GeneralTooltip
          content='Eliminar Categoria'
          triggerContent={
            <span className='bg-red-500 text-white rounded-full p-1'>
              <TbTrash size={20}/>
            </span>
          }
          onClick={()=> handleDelete(row?.original.id)}
        />
      </div>
    ),
  }
]

export default columns