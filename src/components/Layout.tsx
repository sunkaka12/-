import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  FileSpreadsheet, 
  Factory, 
  Boxes, 
  Truck, 
  AlertTriangle, 
  DollarSign,
  User,
  LogOut,
  Bell
} from "lucide-react";
import { cn } from "../lib/utils";

const NAV_ITEMS = [
  { path: "/", label: "经营看板", icon: LayoutDashboard },
  { path: "/orders", label: "门店订货", icon: ShoppingCart },
  { path: "/products", label: "商品库 (SKU)", icon: Package },
  { path: "/planning", label: "订单汇总", icon: FileSpreadsheet },
  { path: "/production", label: "生产计划", icon: Factory },
  { path: "/inventory", label: "批次库存", icon: Boxes },
  { path: "/delivery", label: "配送签收", icon: Truck },
  { path: "/exceptions", label: "异常处理", icon: AlertTriangle },
  { path: "/settlement", label: "财务对账", icon: DollarSign },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-neutral-50 flex h-screen overflow-hidden text-neutral-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 text-neutral-300 flex flex-col shrink-0 transition-all duration-300 z-20 shadow-xl">
        <div className="h-16 flex items-center px-6 border-b border-neutral-800 bg-neutral-950/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Boxes size={20} className="stroke-[2.5]" />
            </div>
            <span className="font-semibold text-neutral-100 tracking-wide text-lg">包有帮 <span className="text-emerald-400 text-sm font-bold bg-emerald-400/10 px-1.5 py-0.5 rounded ml-1">SaaS</span></span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3 px-3">核心业务闭环</div>
          <nav className="space-y-1 relative">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative overflow-hidden",
                    isActive 
                      ? "text-emerald-400 bg-emerald-400/10" 
                      : "hover:bg-neutral-800/80 hover:text-neutral-100"
                  )}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-emerald-400 rounded-r-md"></span>
                  )}
                  <Icon size={18} className={cn("shrink-0 transition-transform group-hover:scale-110", isActive ? "text-emerald-400" : "text-neutral-400")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-neutral-800">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-800/50">
            <div className="w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center shrink-0 border border-neutral-600">
              <User size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-neutral-100 truncate">管理员</div>
              <div className="text-xs text-neutral-500 truncate">admin@baoyoubang.com</div>
            </div>
            <button className="text-neutral-500 hover:text-red-400 transition-colors hidden group-hover:block">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F4F5F7] sticky top-0 relative">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-8 shrink-0 z-10 shadow-sm/50">
          <div className="flex items-center gap-4">
             <h1 className="text-xl font-semibold text-neutral-800 tracking-tight">
               {NAV_ITEMS.find(item => item.path === location.pathname)?.label || "工作台"}
             </h1>
          </div>
          
          <div className="flex items-center gap-5">
            <button className="relative p-2 text-neutral-500 hover:bg-neutral-100 rounded-full transition-colors">
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              <Bell size={20} />
            </button>
            <div className="h-6 w-px bg-neutral-200"></div>
            <div className="text-sm">
              <div className="font-medium text-neutral-700">总仓 - 华东配区</div>
              <div className="text-xs text-emerald-600 font-medium text-right flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                系统运行正常
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto pb-24">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
