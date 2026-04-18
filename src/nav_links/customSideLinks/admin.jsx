import { TbSettings } from 'react-icons/tb'
import { FaTruck } from 'react-icons/fa'
import { BiCategoryAlt } from 'react-icons/bi'
import { PiNutBold } from 'react-icons/pi'
import { MdOutlineManageAccounts } from 'react-icons/md'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { BsFillPersonLinesFill } from 'react-icons/bs'

export const adminLinks = [
  {
    title: 'Gestión de Mantenimientos',
    label: '',
    href: '/procesarmantenimientos',
    icon: <PiNutBold size={18} />,
  },
  {
    title: 'Inventario de Repuestos y Maquinaria',
    label: '',
    href: '/inventariomaquinariayrepuestos',
    icon: <FaTruck size={18} />,
  },
  {
    title: 'Proveedores',
    label: '',
    href: '/proveedores',
    icon: <FaTruck size={18} />,
  },
  {
    title: 'Sales Management',
    label: '',
    href: '/salesmanagement',
    icon: <HiOutlineDocumentText size={18} />,
  },
  {
    title: 'Customer Management',
    label: '',
    href: '/customermanagement',
    icon: <BsFillPersonLinesFill size={18} />,
  },
  {
    title: 'Ajustes',
    label: '',
    href: '/ajustes',
    icon: <TbSettings size={18} />,
  },
]