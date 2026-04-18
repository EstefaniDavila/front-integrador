import {
  TbLayoutDashboard,
  TbSettings,
  TbBook,
} from "react-icons/tb"
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { PiNutBold } from "react-icons/pi";



export const customerLinks = [

  // {
  //   title: 'Dashboard',
  //   label: '',
  //   href: '/dashboard',
  //   icon: <TbLayoutDashboard size={18} />,
  // },
  {
    title: 'Mis Mantenimientos',
    label: '',
    href: '/mantenimientos',
    icon: <PiNutBold  size={18} />,
  },
  {
    title: 'Ajustes',
    label: '',
    href: '/ajustes',
    icon: <TbSettings size={18} />,
  },
]
