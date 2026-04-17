import { adminLinks } from "./customSideLinks/admin"
import { customerLinks } from "./customSideLinks/customer"

const user = JSON.parse(localStorage.getItem("user"))

const roleLinks = {
  Admin: adminLinks,
  Customer: customerLinks
}

//const sidelinks = roleLinks[user?.roleable_type] || []
const sidelinks = roleLinks[user?.role] || []

export { sidelinks }