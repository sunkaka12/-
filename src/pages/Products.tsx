import { Search, Plus, Filter, PackageOpen } from "lucide-react";

const MOCK_SKUS = [
  { id: "SKU-1001", name: "冷鲜去骨鸡腿肉", spec: "5kg/包", unit: "包", shelfLife: "A类(7天)", temp: "冷藏 0-4℃", supplier: "南汇家禽", cost: "¥95.00", price: "¥110.00", status: "启用" },
  { id: "SKU-1002", name: "进口厚切牛排", spec: "200g/块", unit: "块", shelfLife: "B类(6个月)", temp: "冷冻 -18℃", supplier: "澳洲顺丰", cost: "¥28.50", price: "¥35.00", status: "启用" },
  { id: "SKU-1003", name: "有机罗马生菜", spec: "1kg/袋", unit: "袋", shelfLife: "A类(3天)", temp: "冷藏 0-4℃", supplier: "本地农超", cost: "¥8.00", price: "¥12.00", status: "启用" },
  { id: "SKU-1004", name: "大豆色拉油", spec: "20L/桶", unit: "桶", shelfLife: "C类(12个月)", temp: "常温", supplier: "金龙粮油", cost: "¥165.00", price: "¥180.00", status: "停用" },
];

export default function Products() {
  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索 SKU 编号、名称..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all w-72 shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white border border-neutral-200 rounded-xl text-neutral-600 hover:bg-neutral-50 transition-colors shadow-sm focus:outline-none">
            <Filter size={18} />
          </button>
        </div>
        <div className="flex gap-3">
          <button className="bg-white text-neutral-700 border border-neutral-200 px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-neutral-50 transition-all shadow-sm">
            导入 / 导出
          </button>
          <button className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-neutral-800 transition-all shadow-sm active:scale-95">
            <Plus size={18} />
            新建商品档案
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50/80 text-neutral-500 font-medium">
              <tr>
                <th className="px-6 py-4">SKU 名称 / 编号</th>
                <th className="px-6 py-4">规格</th>
                <th className="px-6 py-4">保质期管控</th>
                <th className="px-6 py-4">存储温层</th>
                <th className="px-6 py-4">默认供应商</th>
                <th className="px-6 py-4">内部售价</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {MOCK_SKUS.map((sku) => (
                <tr key={sku.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
                         <PackageOpen size={20} className="text-neutral-400" />
                      </div>
                      <div>
                        <div className="font-medium text-neutral-800">{sku.name}</div>
                        <div className="text-xs text-neutral-500 mt-0.5">{sku.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{sku.spec} / {sku.unit}</td>
                  <td className="px-6 py-4 text-neutral-700">{sku.shelfLife}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-neutral-100 text-xs text-neutral-600 font-medium">
                      {sku.temp}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{sku.supplier}</td>
                  <td className="px-6 py-4 font-semibold text-neutral-800">{sku.price}</td>
                  <td className="px-6 py-4">
                    {sku.status === "启用" ? (
                      <span className="flex items-center gap-1.5 text-emerald-600 font-medium text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 启用
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-neutral-400 font-medium text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span> 停用
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">编辑</button>
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
