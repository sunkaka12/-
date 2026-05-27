import { Boxes, PackageSearch, AlertTriangle, ArrowRightLeft } from "lucide-react";
import { cn } from "../lib/utils";

const MOCK_INVENTORY = [
  { batch: "B-231022-01", sku: "冷鲜去骨鸡腿肉", qty: "45 包", prodDate: "2023-10-22", expDate: "2023-10-29", remaining: "5天", status: "正常" },
  { batch: "B-231020-14", sku: "冷鲜去骨鸡腿肉", qty: "8 包", prodDate: "2023-10-20", expDate: "2023-10-27", remaining: "3天", status: "临期" },
  { batch: "B-230501-88", sku: "进口厚切牛排", qty: "420 块", prodDate: "2023-05-01", expDate: "2023-11-01", remaining: "7天", status: "临期" },
];

const MOCK_PICKING = [
  { store: "新天地旗舰店", items: "12 / 12 项", progress: "100%", status: "已完成待发车", picker: "张小峰" },
  { store: "徐家汇直营店", items: "7 / 8 项", progress: "85%", status: "分拣中(缺货:罗马生菜)", picker: "刘达" },
];

export default function Inventory() {
  return (
    <div className="flex flex-col gap-8">
      
      {/* Picking Tasks section */}
      <div>
         <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
             <PackageSearch className="text-emerald-500" size={20} />
             发车发线分拣任务
          </h2>
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-xl font-medium text-sm shadow-sm hover:bg-emerald-600 transition-colors">
            打印分拣总单
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_PICKING.map((task, i) => (
             <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-neutral-200">
               <div className="flex justify-between mb-3">
                 <div className="font-semibold text-neutral-800">{task.store}</div>
                 <div className={cn(
                   "text-xs font-bold px-2 py-1 rounded bg-neutral-100",
                   task.status.includes("缺货") ? "text-red-600 bg-red-50" : "text-emerald-600 bg-emerald-50"
                 )}>
                   {task.status}
                 </div>
               </div>
               
               <div className="flex items-center gap-4 text-sm text-neutral-600">
                 <div className="flex-1">
                   <div className="flex justify-between text-xs mb-1.5 font-medium">
                     <span>覆盖商品数</span>
                     <span className="text-neutral-900">{task.items}</span>
                   </div>
                   <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                     <div className={cn(
                       "h-full rounded-full transition-all",
                       task.status.includes("缺货") ? "bg-red-400" : "bg-emerald-500"
                     )} style={{width: task.progress}}></div>
                   </div>
                 </div>
                 <div className="text-xs bg-neutral-50 px-2 py-1 rounded text-neutral-500">
                   分拣人: {task.picker}
                 </div>
               </div>
             </div>
          ))}
        </div>
      </div>

      {/* Batch Inventory section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
             <Boxes className="text-blue-500" size={20} />
             批次库存洞察 (FIFO 管理)
          </h2>
          <div className="flex gap-2">
             <button className="text-neutral-600 border border-neutral-200 bg-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 hover:bg-neutral-50"><ArrowRightLeft size={14}/> 库内调拨</button>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-blue-50/50 text-blue-900/60 font-medium">
              <tr>
                <th className="px-6 py-4">批次号</th>
                <th className="px-6 py-4">SKU / 货位</th>
                <th className="px-6 py-4">当前可用数量</th>
                <th className="px-6 py-4">生产日期</th>
                <th className="px-6 py-4">到期日 (保质期)</th>
                <th className="px-6 py-4">状态预警</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {MOCK_INVENTORY.map((row, i) => (
                <tr key={i} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-neutral-500">{row.batch}</td>
                  <td className="px-6 py-4 font-medium text-neutral-800">{row.sku} <span className="block text-xs text-neutral-400 font-normal mt-0.5">货位: A区-02列-层3</span></td>
                  <td className="px-6 py-4 font-bold text-neutral-800 text-base">{row.qty}</td>
                  <td className="px-6 py-4 text-neutral-600">{row.prodDate}</td>
                  <td className="px-6 py-4 text-neutral-600">{row.expDate}</td>
                  <td className="px-6 py-4">
                     {row.status === "临期" ? (
                       <span className="flex items-center gap-1.5 text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
                         <AlertTriangle size={14} /> 剩余 {row.remaining} (优先出库)
                       </span>
                     ) : (
                       <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                         安全
                       </span>
                     )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
