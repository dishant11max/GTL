import { Outlet, NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Truck, Package, Map, BarChart3, Bell, Settings, Search, Menu, User, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const NAV_ITEMS = [
  { label: "Orders", href: "/admin/orders", icon: Package },
  { label: "Drivers", href: "/admin/drivers", icon: Truck },
  { label: "Trips", href: "/admin/trips", icon: LayoutDashboard }, // Should be trips icon, LayoutDashboard is placeholder
  { label: "Optimizer", href: "/admin/optimizer", icon: Map },
  { label: "Live Tracking", href: "/admin/live", icon: Map }, // TODO: Different icon
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Alerts", href: "/admin/alerts", icon: AlertTriangle },
];

export function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full bg-muted/40 font-sans">
      {/* Sidebar Desktop */}
      <aside className="hidden border-r bg-background w-64 flex-col md:flex">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <NavLink to="/admin/orders" className="flex items-center gap-2 font-semibold">
            <Truck className="h-6 w-6" />
            <span className="">Dispatchly</span>
          </NavLink>
        </div>
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 mt-4 gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  isActive ? "bg-muted text-primary" : "text-muted-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto p-4 border-t">
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                    <p className="font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">admin@dispatchly.com</p>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <div className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <Truck className="h-6 w-6" />
                  <span>Dispatchly</span>
                </div>
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
                        isActive ? "bg-muted text-foreground" : "text-muted-foreground"
                      )
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search orders, drivers, trips... (Ctrl+K)"
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
             <Settings className="h-5 w-5" />
          </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
