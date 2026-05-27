import { useState } from "react";
import { Search, Plus, Filter, FileText, ChevronDown, CheckCircle2, Clock } from "lucide-react";
import { cn } from "../lib/utils";

const MOCK_ORDERS = [
  { id: "ORD-20231024-001", store: "新天地旗舰店", items: 12, amount: "¥4,250", date: "2023-10-24 08:30", deliveryDate: "2023-10-25", status: "已汇总" },
  { id: "ORD-20231024-002", store: "徐家汇直营店", items: 8, amount: "¥2,800", date: "2023-10-24 09:12", deliveryDate: "2023-10-25", status: "已提交" },
  { id: "ORD-20231024-003", store: "五角场加盟店", items: 24, amount: "¥8,900", date: "2023-10-24 09:45", deliveryDate: "2023-10-25", status: "已发货" },
  { id: "ORD-20231023-088", store: "南京西路店", items: 5, amount: "¥1,200", date: "2023-10-23 18:20", deliveryDate: "2023-10-24", status: "已签收" },
  { id: "ORD-20231024-005", store: "静安寺严选店", items: 15, amount: "¥5,600", date: "2023-10-24 10:05", deliveryDate: "2023-10-25", status: "草稿" },
];

const STATUS_COLORS: Record<string, string> = {
  "草稿": "bg-neutral-100 text-neutral-600",
  "已提交": "bg-blue-50 text-blue-600 border-blue-200",
  "已汇总": "bg-indigo-50 text-indigo-600 border-indigo-200",
  "已发货": "bg-amber-50 text-amber-600 border-amber-200",
  "已签收": "bg-emerald-50 text-emerald-600 border-emerald-200",
};

export default function Orders() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6">
      
      {/* Top Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索门店名称、订单号..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all w-72 shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white border border-neutral-200 rounded-xl text-neutral-600 hover:bg-neutral-50 transition-colors shadow-sm focus:outline-none">
            <Filter size={18} />
          </button>
        </div>
        <button className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-neutral-800 transition-all shadow-sm active:scale-95">
          <Plus size={18} />
          新建订货单
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-neutral-200">
        {["全部订单", "待提交", "已提交待汇总", "正在配送", "已完成"].map((tab, idx) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(idx.toString())}
            className={cn(
              "pb-3 text-sm font-medium transition-colors relative",
              activeTab === idx.toString() ? "text-emerald-600" : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            {tab}
            {activeTab === idx.toString() && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-t-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50/80 text-neutral-500 font-medium">
              <tr>
                <th className="px-6 py-4">订单编号</th>
                <th className="px-6 py-4">门店信息</th>
                <th className="px-6 py-4">SKU 数量</th>
                <th className="px-6 py-4">总预估金额</th>
                <th className="px-6 py-4">订货时间</th>
                <th className="px-6 py-4">要求配送日</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {MOCK_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <FileText size={16} className="text-neutral-400" />
                       <span className="font-medium text-neutral-800">{order.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-neutral-700">{order.store}</td>
                  <td className="px-6 py-4 text-neutral-600">{order.items} 项</td>
                  <td className="px-6 py-4 font-semibold text-neutral-800">{order.amount}</td>
                  <td className="px-6 py-4 text-neutral-500 flex items-center gap-1.5"><Clock size={14}/>{order.date}</td>
                  <td className="px-6 py-4 text-neutral-700">{order.deliveryDate}</td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2.5 py-1 rounded-md text-xs font-medium border", STATUS_COLORS[order.status])}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">查看详情</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-neutral-100 flex items-center justify-between text-sm text-neutral-500 bg-neutral-50/30">
          <div>显示 1 - 5 条，共 5 条记录</div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded border border-neutral-200 hover:bg-neutral-100 disabled:opacity-50">上一页</button>
            <button className="px-3 py-1.5 rounded border border-neutral-200 hover:bg-neutral-100 bg-white">下一页</button>
          </div>
        </div>
      </div>

    </div>
  );
}
