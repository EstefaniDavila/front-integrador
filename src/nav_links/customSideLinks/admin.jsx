import {
  TbLayoutDashboard,
  TbSettings,
  TbBook,
} from "react-icons/tb"
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { FiType } from "react-icons/fi";
import { TbLetterA } from "react-icons/tb";
import { LiaFileContractSolid } from "react-icons/lia";
import { FaClipboardQuestion } from "react-icons/fa6";


export const adminLinks = [

  // {
  //   title: 'Dashboard',
  //   label: '',
  //   href: '/dashboard',
  //   icon: <TbLayoutDashboard size={18} />,
  // },
  {
    title: 'Productos',
    label: '',
    href: '/Productos',
    icon: <FaShoppingCart size={18} />,
  },

  {
    title: 'Proveedores',
    label: '',
    href: '/proveedores',
    icon: <FaTruck size={18} />,
  },

  {
    title: 'Categorias',
    label: '',
    href: '/categorias',
    icon: <BiCategoryAlt size={18} />,
  },
  
  {
    title: 'Ajustes',
    label: '',
    href: '/ajustes',
    icon: <TbSettings size={18} />,
  },
]
