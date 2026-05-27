import { Activity, PlayCircle, Layers, Link as LinkIcon } from "lucide-react";
import { cn } from "../lib/utils";

const MOCK_SUMMARY = [
  { sku: "SKU-1001", name: "冷鲜去骨鸡腿肉", storeDemands: 12, totalQty: "58 包", status: "已生成排产", date: "2023-10-25" },
  { sku: "SKU-1002", name: "进口厚切牛排", storeDemands: 5, totalQty: "120 块", status: "待生成需求", date: "2023-10-25" },
  { sku: "SKU-1003", name: "有机罗马生菜", storeDemands: 18, totalQty: "45 袋", status: "不排产(直接入库)", date: "2023-10-25" },
];

const MOCK_PROD = [
  { id: "PRD-231024-01", sku: "冷鲜去骨鸡腿肉 (SKU-1001)", demand: "58 包", buffer: "+2 包", total: "60 包", deadline: "10-24 16:00", assignee: "一车间-王强", status: "生产中" },
  { id: "PRD-231024-02", sku: "进口厚切牛排 (SKU-1002)", demand: "120 块", buffer: "+5 块", total: "125 块", deadline: "10-25 08:00", assignee: "二车间-李飞", status: "已完成" },
];

export default function Planning() {
  return (
    <div className="flex flex-col gap-8">
      
      {/* Module 1: Order Summary */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
             <Layers className="text-indigo-500" size={20} />
             订货单汇总需求 (基于发货日 2023-10-25)
          </h2>
          <button className="bg-indigo-500 text-white px-4 py-2 rounded-xl font-medium text-sm shadow-sm hover:bg-indigo-600 transition-colors">
            一键生成生产/采购单
          </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-indigo-50/50 text-indigo-900/60 font-medium border-b border-indigo-100/50">
              <tr>
                <th className="px-6 py-4">SKU 信息</th>
                <th className="px-6 py-4">要货门店数</th>
                <th className="px-6 py-4">汇总需求量</th>
                <th className="px-6 py-4">履约链路策略</th>
                <th className="px-6 py-4">转化状态</th>
                <th className="px-6 py-4 text-right">明细</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {MOCK_SUMMARY.map((row, i) => (
                <tr key={i} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-neutral-800">{row.name} <span className="text-neutral-400 text-xs ml-1">{row.sku}</span></td>
                  <td className="px-6 py-4 text-neutral-600">{row.storeDemands} 家</td>
                  <td className="px-6 py-4 font-bold text-neutral-800 text-base">{row.totalQty}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">内部加工排产</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("text-xs font-medium", row.status.includes("完成") || row.status.includes("排产") ? "text-emerald-600" : "text-amber-500")}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-indigo-600 hover:text-indigo-800"><LinkIcon size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Module 2: Production Tasks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
             <Activity className="text-amber-500" size={20} />
             生鲜加工排产看板
          </h2>
          <div className="flex gap-2">
             <span className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-200 rounded-lg text-sm font-medium">1 待排产</span>
             <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg text-sm font-medium">4 生产中</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_PROD.map((task) => (
            <div key={task.id} className="bg-white p-5 rounded-2xl shadow-sm border border-neutral-200 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-medium text-neutral-400 mb-1">{task.id}</div>
                  <div className="font-semibold text-neutral-800 leading-tight">{task.sku}</div>
                </div>
                <span className={cn(
                  "px-2 py-1 text-xs font-bold rounded-lg border",
                  task.status === "生产中" ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"
                )}>
                  {task.status}
                </span>
              </div>
              
              <div className="bg-neutral-50 rounded-xl p-3 grid grid-cols-3 gap-2">
                <div>
                  <div className="text-xs text-neutral-500 mb-0.5">订单需求</div>
                  <div className="font-medium text-neutral-700">{task.demand}</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-500 mb-0.5">计划容错</div>
                  <div className="font-medium text-neutral-700">{task.buffer}</div>
                </div>
                <div>
                  <div className="text-xs text-emerald-600 font-medium mb-0.5">投产总计</div>
                  <div className="font-bold text-emerald-700">{task.total}</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="text-neutral-500 flex items-center gap-1.5"><PlayCircle size={14} className="text-neutral-400"/> {task.assignee}</div>
                <div className="text-red-500 font-medium text-xs bg-red-50 px-2 py-1 rounded">最迟: {task.deadline}</div>
              </div>
            </div>
          ))}
          
          <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center text-neutral-400 hover:bg-neutral-50 transition-colors cursor-pointer">
            <Activity size={24} className="mb-2 text-neutral-300" />
            <span className="font-medium text-sm">查看全部排产日历</span>
          </div>
        </div>

      </div>

    </div>
  );
}
