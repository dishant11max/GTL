import { Outlet, useLocation } from "react-router-dom";

export function DriverLayout() {
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <header className="h-14 border-b flex items-center justify-center bg-primary text-primary-foreground shadow-md sticky top-0 z-10">
        <h1 className="font-bold text-lg">Dispatchly Driver</h1>
      </header>
      <main className="flex-1 overflow-auto pb-safe">
        <Outlet />
      </main>
    </div>
  );
}
