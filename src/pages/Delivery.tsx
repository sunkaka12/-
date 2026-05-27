import { MapPin, Truck, CheckCircle2, XCircle, Navigation, ShieldAlert, Phone } from "lucide-react";
import { cn } from "../lib/utils";

const ROUTES = [
  {
    id: "RT-SH-05",
    driver: "李师傅",
    vehicle: "沪A·DG8332 (冷藏4.2m)",
    progress: "2/5",
    status: "配送中",
    stores: [
      { name: "静安寺严选店", status: "已完成", time: "07:15", exception: null },
      { name: "南京西路店", status: "已完成", time: "08:30", exception: "破损 2件" },
      { name: "新天地旗舰店", status: "即将到达", time: "预计 09:15", exception: null },
      { name: "徐家汇直营店", status: "排队中", time: "-", exception: null },
      { name: "长宁来福士店", status: "排队中", time: "-", exception: null },
    ]
  }
];

export default function Delivery() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-neutral-800">
          路线与配送轨迹
        </h2>
        <button className="bg-neutral-900 text-white px-4 py-2 rounded-xl font-medium text-sm shadow-sm hover:bg-neutral-800 transition-colors flex items-center gap-2">
          <Navigation size={16} /> 调度平台 / 路径规划
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Route Card list */}
        <div className="space-y-4">
          {ROUTES.map(route => (
            <div key={route.id} className="bg-white rounded-2xl shadow-sm border-2 border-emerald-500 overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                正在执行
              </div>
              <div className="p-5 border-b border-neutral-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-800 text-lg">{route.id} 线</h3>
                    <div className="text-xs text-neutral-500 font-medium">进度: {route.progress} 门店</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm bg-neutral-50 p-3 rounded-xl">
                   <div>
                     <div className="text-xs text-neutral-500 mb-0.5">司机</div>
                     <div className="font-medium flex items-center gap-1">{route.driver} <Phone size={12} className="text-blue-500 cursor-pointer"/></div>
                   </div>
                   <div>
                     <div className="text-xs text-neutral-500 mb-0.5">车辆类型</div>
                     <div className="font-medium text-neutral-700">{route.vehicle}</div>
                   </div>
                </div>
              </div>

              <div className="p-5 space-y-4 relative">
                <div className="absolute left-7 top-6 bottom-6 w-0.5 bg-neutral-100"></div>
                {route.stores.map((store, i) => (
                  <div key={i} className="flex relative z-10">
                    <div className="w-5 flex flex-col items-center shrink-0 mr-3 mt-0.5">
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 bg-white",
                        store.status === "已完成" ? "border-emerald-500" : store.status === "即将到达" ? "border-blue-500" : "border-neutral-300"
                      )}>
                        {store.status === "即将到达" && <div className="w-2 h-2 bg-blue-500 rounded-full m-0.5 animate-pulse"></div>}
                        {store.status === "已完成" && <div className="w-2 h-2 bg-emerald-500 rounded-full m-0.5"></div>}
                      </div>
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex justify-between items-start mb-1">
                        <div className={cn("font-medium text-sm", store.status === "已完成" ? "text-neutral-800" : "text-neutral-500")} >
                          {store.name}
                        </div>
                        <div className="text-xs font-medium text-neutral-400">{store.time}</div>
                      </div>
                      {store.exception && (
                         <div className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded border border-red-100 mt-1">
                           <ShieldAlert size={12}/> 签收异常: {store.exception}
                         </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="bg-white p-5 text-center text-neutral-400 rounded-2xl shadow-sm border border-neutral-200 border-dashed cursor-pointer hover:bg-neutral-50">
            + 查看其他 8 条派车路线
          </div>
        </div>

        {/* Map Area Mock */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden relative flex flex-col">
           <div className="p-4 border-b border-neutral-100 flex justify-between items-center bg-zinc-50/50">
             <div className="font-semibold text-neutral-700 flex items-center gap-2">
               <MapPin size={18} className="text-neutral-400" />
               上海市区配送网点活点地图
             </div>
             <div className="text-xs text-neutral-500">模拟高德/腾讯地图渲染区域</div>
           </div>
           <div className="flex-1 bg-[#e8eaed] relative overflow-hidden flex items-center justify-center p-8">
             {/* Simple Map Visualization abstraction */}
             <div className="relative w-full h-full max-w-lg">
                <svg viewBox="0 0 400 400" className="w-full h-full opacity-30 text-blue-900 drop-shadow-sm">
                  <path d="M100,50 Q150,150 250,100 T350,200 Q250,300 150,250 T50,150 Z" fill="none" stroke="currentColor" strokeWidth="4"/>
                  <path d="M50,150 L100,50 L250,100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5"/>
                </svg>
                
                {/* Truck marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-lg z-10 animate-bounce">
                  <div className="bg-blue-600 text-white p-2 rounded-xl border-2 border-white shadow-xl flex items-center gap-1">
                     <Truck size={16} /><span className="text-xs font-bold font-mono tracking-tighter">RT-SH-05</span>
                  </div>
                </div>

                {/* Point markers */}
                <div className="absolute top-1/4 left-1/4">
                  <div className="w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow"></div>
                </div>
                <div className="absolute top-1/3 right-1/4">
                  <div className="w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow"></div>
                </div>
                <div className="absolute bottom-1/3 left-1/2">
                  <div className="w-5 h-5 bg-yellow-500 border-2 border-white rounded-full shadow"></div>
                </div>
             </div>
             
             {/* Map Controls */}
             <div className="absolute bottom-4 right-4 flex flex-col gap-2">
               <button className="w-10 h-10 bg-white rounded-lg shadow border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-neutral-900 font-bold">+</button>
               <button className="w-10 h-10 bg-white rounded-lg shadow border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-neutral-900 font-bold">-</button>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
