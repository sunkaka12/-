import { 
  ShoppingBag, 
  Factory, 
  PackageSearch, 
  Truck, 
  AlertOctagon, 
  CreditCard,
  TrendingUp,
  TrendingDown,
  Activity
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const KPIS = [
  { label: "今日门店订单", value: "342", unit: "单", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "待排产/生产中", value: "128", unit: "批", icon: Factory, color: "text-amber-500", bg: "bg-amber-50" },
  { label: "待分拣出库", value: "85", unit: "单", icon: PackageSearch, color: "text-indigo-500", bg: "bg-indigo-50" },
  { label: "配送中", value: "215", unit: "单", icon: Truck, color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "异常状态(损耗/缺)", value: "12", unit: "单", icon: AlertOctagon, color: "text-red-500", bg: "bg-red-50" },
  { label: "今日应收预估", value: "¥45,280", unit: "", icon: CreditCard, color: "text-violet-500", bg: "bg-violet-50" },
];

const METRICS = [
  { label: "缺货率", value: "1.2%", trend: "down", bg: "bg-zinc-50" },
  { label: "准时送达率", value: "98.5%", trend: "up", bg: "bg-zinc-50" },
  { label: "拣货损耗率", value: "0.8%", trend: "down", bg: "bg-zinc-50" },
  { label: "门店签收率", value: "96.4%", trend: "up", bg: "bg-zinc-50" },
];

const DATA_WEEKLY = [
  { name: '周一', 订单量: 320, 履约量: 310 },
  { name: '周二', 订单量: 350, 履约量: 345 },
  { name: '周三', 订单量: 340, 履约量: 330 },
  { name: '周四', 订单量: 380, 履约量: 375 },
  { name: '周五', 订单量: 410, 履约量: 400 },
  { name: '周六', 订单量: 450, 履约量: 440 },
  { name: '周日', 订单量: 390, 履约量: 385 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      
      {/* Overview KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {KPIS.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-neutral-100 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-xl ${kpi.bg}`}>
                  <Icon size={20} className={kpi.color} />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight text-neutral-800">
                  {kpi.value} <span className="text-sm font-medium text-neutral-500 ml-1">{kpi.unit}</span>
                </div>
                <div className="text-sm font-medium text-neutral-500 mt-1">{kpi.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {METRICS.map((metric, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-neutral-100 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-neutral-500">{metric.label}</div>
              <div className="text-2xl justify-start font-bold tracking-tight text-neutral-800 mt-1 flex items-baseline gap-2">
                {metric.value}
                {metric.trend === 'up' ? (
                   <span className="text-xs font-medium text-emerald-500 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded"><TrendingUp size={12} className="mr-1"/> 较昨日提高</span>
                ) : (
                   <span className="text-xs font-medium text-emerald-500 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded"><TrendingDown size={12} className="mr-1"/> 较昨日下降</span>
                )}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-300">
              <Activity size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
          <h3 className="text-lg font-semibold text-neutral-800 mb-6 flex items-center">
             近七日订单与履约趋势
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA_WEEKLY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOrder" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFulfill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a3a3a3', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#a3a3a3', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ color: '#525252', fontWeight: 600, marginBottom: '4px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Area type="monotone" dataKey="订单量" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorOrder)" />
                <Area type="monotone" dataKey="履约量" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorFulfill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
          <h3 className="text-lg font-semibold text-neutral-800 mb-6 flex items-center">
             各仓储发货周转 (单数)
           </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DATA_WEEKLY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a3a3a3', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#a3a3a3', fontSize: 12}} />
                <Tooltip 
                   cursor={{fill: '#f5f5f5'}}
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Bar dataKey="订单量" name="华东仓拣报" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="履约量" name="华北配单" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
