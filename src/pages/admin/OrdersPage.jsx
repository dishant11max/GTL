import { useEffect, useState } from "react";
import { useAppStore } from "@/stores/useAppStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Package, Plus, Search, Filter } from "lucide-react";
import { format } from "date-fns";

export default function OrdersPage() {
  const { orders, fetchInitialData } = useAppStore();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(filter.toLowerCase()) ||
      o.customerName.toLowerCase().includes(filter.toLowerCase()),
  );

  const stats = {
    active: orders.filter((o) =>
      ["PENDING", "ASSIGNED", "IN_TRANSIT"].includes(o.status),
    ).length,
    delivered: orders.filter((o) => o.status === "DELIVERED").length,
    delayed: 0, // Mock
    priority: orders.filter((o) => o.priority === "HIGH").length,
  };

  return (
    <div className="flex flex-col gap-6">
      {/* KPI Header */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">+2 from last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Delivered Today
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.delivered}</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delayed</CardTitle>
            <Badge variant="destructive" className="rounded-sm">
              Alert
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.delayed}</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <Badge variant="secondary" className="rounded-sm">
              {stats.priority}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.priority}</div>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 w-full max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter orders..."
              className="pl-8"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Create Order
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create New Order</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <div className="flex flex-col gap-4 text-center items-center justify-center h-[50vh] text-muted-foreground">
                <Package className="h-10 w-10 opacity-20" />
                <p>Order creation form not implemented in this demo.</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Orders Table */}
      <div className="border rounded-xl bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Pickup</TableHead>
              <TableHead>Drop</TableHead>
              <TableHead className="text-right">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "DELIVERED"
                          ? "secondary"
                          : order.status === "IN_TRANSIT"
                            ? "default"
                            : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {order.priority === "HIGH" && (
                      <Badge
                        variant="destructive"
                        className="h-[20px] text-[10px]"
                      >
                        HIGH
                      </Badge>
                    )}
                    {order.priority === "NORMAL" && (
                      <Badge variant="outline" className="h-[20px] text-[10px]">
                        NORMAL
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell
                    className="max-w-[200px] truncate text-muted-foreground"
                    title={order.pickup.address}
                  >
                    {order.pickup.address}
                  </TableCell>
                  <TableCell
                    className="max-w-[200px] truncate text-muted-foreground"
                    title={order.drop.address}
                  >
                    {order.drop.address}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {format(new Date(order.createdAt), "MMM d, HH:mm")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
