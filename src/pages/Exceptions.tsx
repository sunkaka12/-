import { ShieldAlert, AlertTriangle, AlertCircle, FileWarning } from "lucide-react";
import { cn } from "../lib/utils";

const EXCEPTIONS = [
  { id: "EX-1025-01", store: "南京西路店", type: "少货", sku: "进口厚切牛排", qty: "2 块", status: "待处理", time: "1小时前", relatedOrder: "ORD-20231024-088" },
  { id: "EX-1025-02", store: "长宁来福士店", type: "破损", sku: "有机罗马生菜", qty: "1 袋", status: "处理中", time: "3小时前", relatedOrder: "ORD-20231024-092" },
  { id: "EX-1024-11", store: "静安寺严选店", type: "拒收", sku: "冷鲜去骨鸡腿肉", qty: "全部", status: "已驳回", time: "昨天", relatedOrder: "ORD-20231023-010" },
];

export default function Exceptions() {
  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "待处理异常", value: 5, color: "text-red-500", border: "border-red-200", bg: "bg-white" },
          { label: "处理中", value: 3, color: "text-amber-500", border: "border-neutral-200", bg: "bg-white" },
          { label: "今日已解决", value: 12, color: "text-emerald-500", border: "border-neutral-200", bg: "bg-neutral-50/50" },
        ].map((stat, i) => (
          <div key={i} className={cn("p-5 rounded-2xl shadow-sm border", stat.border, stat.bg)}>
            <div className="text-sm font-medium text-neutral-500 mb-2">{stat.label}</div>
            <div className={cn("text-3xl font-bold tracking-tight", stat.color)}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="p-4 border-b border-neutral-100 flex items-center gap-3">
          <ShieldAlert className="text-red-500" size={20} />
          <h3 className="font-semibold text-neutral-800">签收异常上报列表</h3>
        </div>
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-neutral-50/80 text-neutral-500 font-medium">
            <tr>
              <th className="px-6 py-4">单据号</th>
              <th className="px-6 py-4">门店 / 关联订单</th>
              <th className="px-6 py-4">异常类型</th>
              <th className="px-6 py-4">商品名 / 数量</th>
              <th className="px-6 py-4">反馈时间</th>
              <th className="px-6 py-4">当前状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {EXCEPTIONS.map((ex) => (
              <tr key={ex.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4 font-medium text-neutral-800"><FileWarning size={14} className="inline mr-1 text-red-400"/> {ex.id}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-neutral-700">{ex.store}</div>
                  <div className="text-xs text-neutral-400">{ex.relatedOrder}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-neutral-100 text-neutral-600 px-2 py-1 rounded font-medium text-xs">{ex.type}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-neutral-800">{ex.sku}</div>
                  <div className="text-xs text-red-500 font-medium">异常量: {ex.qty}</div>
                </td>
                <td className="px-6 py-4 text-neutral-500">{ex.time}</td>
                <td className="px-6 py-4">
                   <span className={cn(
                     "px-2.5 py-1 rounded-md text-xs font-semibold border",
                     ex.status === "待处理" ? "bg-red-50 text-red-600 border-red-200" :
                     ex.status === "处理中" ? "bg-amber-50 text-amber-600 border-amber-200" :
                     "bg-neutral-100 text-neutral-500 border-neutral-200"
                   )}>
                     {ex.status}
                   </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-indigo-600 font-medium hover:text-indigo-800">跟进处理</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
