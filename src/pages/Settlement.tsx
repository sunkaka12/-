import { DollarSign, FileText, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "../lib/utils";

const BILLS = [
  { store: "新天地旗舰店", month: "2023-10", rawAmount: 145000, exceptionDeduction: -240, finalAmount: 144760, status: "待门店确认" },
  { store: "徐家汇直营店", month: "2023-10", rawAmount: 98000, exceptionDeduction: 0, finalAmount: 98000, status: "门店已确认" },
  { store: "南京西路店", month: "2023-10", rawAmount: 112000, exceptionDeduction: -1500, finalAmount: 110500, status: "对账异常" },
];

export default function Settlement() {
  return (
    <div className="space-y-6">
      
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 p-6 rounded-2xl shadow border border-indigo-700 text-white">
          <div className="flex items-center gap-2 text-indigo-200 mb-2 font-medium">
            <DollarSign size={18} /> 十月累计应收总额
          </div>
          <div className="text-3xl font-bold tracking-tight mb-1">¥ 2,845,200.00</div>
          <div className="flex items-center gap-1 text-sm text-emerald-400 font-medium">
            <ArrowUpRight size={14} /> 环比增长 12.5%
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
          <div className="flex items-center gap-2 text-neutral-500 mb-2 font-medium">
            当期已确认金额
          </div>
          <div className="text-3xl font-bold tracking-tight text-neutral-800 mb-1">¥ 1,420,000.00</div>
          <div className="text-sm text-neutral-400 font-medium line-clamp-1">
             进度: 15 / 32 家门店
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-red-400"></div>
          <div className="flex items-center gap-2 text-neutral-500 mb-2 font-medium">
            本月异常扣款累计
          </div>
          <div className="text-3xl font-bold tracking-tight text-red-500 mb-1">- ¥ 8,450.00</div>
          <div className="flex items-center gap-1 text-sm text-neutral-500 font-medium">
             来自 24 笔异常处理
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="p-4 border-b border-neutral-100 flex justify-between items-center bg-zinc-50/50">
          <div className="font-semibold text-neutral-700 flex items-center gap-2">
            <FileText size={18} className="text-neutral-400" />
            2023年10月 各门店账单明细
          </div>
          <button className="text-sm bg-white border border-neutral-200 px-3 py-1.5 rounded-lg text-neutral-600 font-medium hover:bg-neutral-50 shadow-sm">
            导出表格
          </button>
        </div>
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-white text-neutral-500 font-medium border-b border-neutral-100">
            <tr>
              <th className="px-6 py-4">门店信息</th>
              <th className="px-6 py-4">账期</th>
              <th className="px-6 py-4 text-right">履约发货总计</th>
              <th className="px-6 py-4 text-right text-red-500/80">异常拒收/破损扣减</th>
              <th className="px-6 py-4 text-right">结算应收总计</th>
              <th className="px-6 py-4 text-center">状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {BILLS.map((bill, i) => (
              <tr key={i} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4 font-medium text-neutral-800">{bill.store}</td>
                <td className="px-6 py-4 text-neutral-600">{bill.month}</td>
                <td className="px-6 py-4 text-right font-medium text-neutral-600">¥ {bill.rawAmount.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-red-500 font-medium">- ¥ {Math.abs(bill.exceptionDeduction).toLocaleString()}</td>
                <td className="px-6 py-4 text-right font-bold text-neural-800">¥ {bill.finalAmount.toLocaleString()}</td>
                <td className="px-6 py-4 text-center">
                   <span className={cn(
                     "px-2.5 py-1 rounded-md text-xs font-semibold border inline-block",
                     bill.status === "门店已确认" ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
                     bill.status === "对账异常" ? "bg-red-50 text-red-600 border-red-200" :
                     "bg-amber-50 text-amber-600 border-amber-200"
                   )}>
                     {bill.status}
                   </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-indigo-600 font-medium hover:text-indigo-800">发送账单</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
