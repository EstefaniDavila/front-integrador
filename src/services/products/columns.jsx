import React from "react"
import { Badge } from "@/components/ui/badge"
import GeneralTooltip from "@/helpers/generalTooltip"
import { TbEdit } from "react-icons/tb"
import { TbTrash } from "react-icons/tb"
import { FaBoxOpen } from "react-icons/fa";

const typeColorVariants = {
  inactive: 'bg-gray-200 text-gray-800',
  active: 'bg-green-200 text-green-800',
  paused: 'bg-yellow-200 text-yellow-800',
  hidden: 'bg-red-200 text-red-800',
  visible: 'bg-blue-200 text-blue-800'
}

const columns = (handleDelete, handleUpdate, handleShow) => [
  {
    accessorKey: 'code',
    header: 'Codigo',
    cell: info => info.getValue(),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: info => info.getValue(),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'provider.name',
    header: 'Proveedor',
    cell: info => info.getValue(),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'category.name',
    header: 'Categoria',
    cell: info => info.getValue(),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'pen_price',
    header: 'Precio Soles',
    cell: info => info.getValue(),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'dollar_price',
    header: 'Precio Dolares',
    cell: info => info.getValue(),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: info => {
      const value = info.getValue()
      const colorVariant = typeColorVariants[value] || 'bg-gray-300 text-gray-800'
      return (
        <Badge className={`px-2 py-1 rounded ${colorVariant}`}>
          {value.toUpperCase()}
        </Badge>
      )
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: 'status_web',
    header: 'Estado Web',
    cell: info => {
      const value = info.getValue()
      const colorVariant = typeColorVariants[value] || 'bg-gray-300 text-gray-800'
      return (
        <Badge className={`px-2 py-1 rounded ${colorVariant}`}>
          {value.toUpperCase()}
        </Badge>
      )
    },
    enableColumnFilter: true,
  },
  {
    header: 'Acciones',
    cell: ({ row }) => (
      <div className="flex space-x-4">
        <GeneralTooltip
          content="Visualizar Producto"
          triggerContent={
            <span className="bg-green-500 text-white rounded-full p-1">
              <FaBoxOpen size={20}/>
            </span>
          }
          onClick={() => handleShow(row?.original, 'show')}
        />
        <GeneralTooltip
          content="Editar Producto"
          triggerContent={
            <span className="bg-yellow-500 text-white rounded-full p-1">
              <TbEdit size={20}/>
            </span>
          }
          onClick={() => handleUpdate(row?.original, 'edit')}
        />
        <GeneralTooltip 
          content="Eliminar Producto"
          triggerContent={
            <span className="bg-red-500 text-white rounded-full p-1">
              <TbTrash size={20} />
            </span>
          }
          onClick={() => handleDelete(row?.original.id)}
        />
      </div>
    )
  },
]

export default columns