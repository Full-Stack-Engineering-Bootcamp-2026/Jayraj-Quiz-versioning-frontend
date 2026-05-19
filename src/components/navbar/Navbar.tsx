import { NavLink, useNavigate } from "react-router-dom"

import { Layers } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useAppDispatch, useAppSelector } from "@/store/hooks"

import { logout } from "@/store/slices/authSlice"

import { navItems } from "@/utils/navigation"

const Navbar = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const permissions = useAppSelector((state) => state.auth.permissions)

  const handleLogout = () => {
    dispatch(logout())

    navigate("/login", { replace: true })
  }

  return (
    <header className="border-b bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/80">
      <div className="grid h-16 w-full grid-cols-3 items-center px-8">
        
        <div className="flex justify-start">
          <NavLink to="/quizzes" className="flex cursor-pointer items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-sm transition-transform duration-200 hover:scale-105">
              <Layers className="h-5 w-5 text-primary-foreground" />
            </div>

            <div>
              <h1 className="text-lg font-semibold tracking-tight">QuizFlow</h1>
            </div>
          </NavLink>
        </div>

        
        <nav className="flex items-center justify-center gap-3">
          {navItems
            .filter((item) => permissions.includes(item.permission))
            .map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  } `
                }
              >
                {item.label}
              </NavLink>
            ))}
        </nav>

        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="cursor-pointer transition-all duration-200 hover:border-destructive hover:bg-destructive hover:text-white"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
