import { Navigate } from "react-router-dom"

import { useAppSelector } from "@/store/hooks"

type Props = {
  permission: string
  children: React.ReactNode
}

const PermissionRoute = ({ permission, children }: Props) => {
  const permissions = useAppSelector((state) => state.auth.permissions)

  const hasPermission = permissions.includes(permission)

  if (!hasPermission) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default PermissionRoute
