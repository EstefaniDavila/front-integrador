import { adminLinks } from "./customSideLinks/admin"

const user = JSON.parse(localStorage.getItem("user"))

const roleLinks = {
  Admin: adminLinks
}

//const sidelinks = roleLinks[user?.roleable_type] || []
const sidelinks = roleLinks[user?.role] || []

export { sidelinks }