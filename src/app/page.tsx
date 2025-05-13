'use client';

import { useState } from "react";

type MenuCategory = "Chicken" | "Wings" | "Side Menu" | "Beverages" | "Alcohol" | "Soju" | "Sauce" | "Event";

// Use it in your state and object
const menuCategories: MenuCategory[] = ["Chicken", "Wings", "Side Menu", "Beverages", "Alcohol", "Soju", "Sauce", "Event"];

const menuItems: Record<MenuCategory, string[]> = {
  Chicken: ["후라이드 치킨", "양념치킨", "스노우 뿌리오 치킨", "마늘 치킨", "간장 치킨", "닭강정", "매운양념 치킨", "핫 스파이시 치킨", "핫데빌 치킨", "파닭", "크림순살"],
  Wings: ["후라이드 윙", "양념윙", "스노우 뿌리오 윙", "마늘 윙", "매운양념 윙", "간장 윙", "핫 스파이시 윙", "핫데빌 윙", "닭강정 윙"],
  "Side Menu": ["감자튀김", "스노우 감튀", "치즈볼", "떡볶이", "로제 떡볶이", "어묵탕", "골뱅이 소면", "콘치즈", "양파링", "오징어튀김", "타코야끼", "계란라면", "짜장라면", "닭똥집", "공기밥"],
  Beverages: ["Coke", "Diet Coke", "Coke Zero", "Sprite", "Canada Dry", "Nestea", "Sparkling Water", "Bottled Water"],
  Alcohol: ["Asahi Pint", "Asahi Pitcher", "Pilsner Pint", "Pilsner Pitcher", "Canadian", "Coors Light", "Sapporo", "Stella", "Heineken", "Asahi", "Non-Alcohol Asahi", "Kozel", "Cass", "Terra", "막걸리"],
  Soju: ["오리지널", "진로이즈백", "참이슬 후레쉬", "처음처럼", "새로", "청포도", "복숭아", "자몽", "청사과", "자두", "파인애플", "요거트", "딸기"],
  Sauce: ["양념소스", "매양소스", "스노우 뿌리오소스", "마늘소스", "간장소스", "강정소스", "핫스파이시소스", "핫데빌소스", "파닭소스", "크림순살소스"],
  Event: [],
};

const sauceTypes = ["후라이드 치킨", "양념치킨", "스노우 뿌리오 치킨", "마늘 치킨", "닭강정", "매운양념 치킨", "간장 치킨", "핫 스파이시 치킨", "핫데빌 치킨", "파닭", "크림순살"];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>("Chicken");
  const [orders, setOrders] = useState<any[]>([]);

  const handleAdd = (item: string) => {
    if (selectedCategory === "Chicken") {
      setOrders([...orders, {
        id: Date.now(),
        category: selectedCategory,
        item,
        options: { sauce: "", bone: "", size: "" }
      }]);
    } else {
      setOrders([...orders, { id: Date.now(), category: selectedCategory, item }]);
    }
  };

  const updateOrder = (id: number, updated: any) => {
    setOrders(orders.map(order => order.id === id ? { ...order, ...updated } : order));
  };

  const removeOrder = (id: number) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const removeAllOrders = () => {
    setOrders([]);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left: Menu List */}
      <div className="w-2/3 p-4 overflow-y-auto">
        <nav className="flex gap-4 mb-4 overflow-x-auto whitespace-nowrap py-3">
          {menuCategories.map(cat => (
            <button
              key={cat}
              className={`px-4 py-2 rounded text-white ${selectedCategory === cat ? "bg-blue-600" : "bg-gray-800"}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>

        <div className="grid grid-cols-2 gap-4">
          {menuItems[selectedCategory].map(item => (
            <button
              key={item}
              onClick={() => handleAdd(item)}
              className="bg-red-800 hover:bg-red-500 p-4 rounded shadow text-xl font-bold text-white"
            >
              {item}
            </button>
          ))}
        </div>
      </div>


      {/* Right: Order Summary */}
      <div className="w-1/3 bg-gray-900 p-4 flex flex-col h-screen">
        <h2 className="text-xl font-bold mb-2 text-white">Order Summary</h2>

        {/* Scrollable orders list */}
        <div className="flex-1 overflow-auto">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-3 rounded shadow mb-2">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{order.item}</p>
                  <p className="text-sm text-gray-500">{order.category}</p>
                </div>
                <button onClick={() => removeOrder(order.id)} className="text-red-800 font-extrabold">✕</button>
              </div>
              {order.category === "Chicken" && (
                <div className="mt-2 space-y-1">
                  <select
                    className="w-full border rounded p-1"
                    value={order.options.sauce}
                    onChange={e => updateOrder(order.id, {
                      item: e.target.value,
                      options: { ...order.options, sauce: e.target.value }
                    })}
                  >
                    <option value="">{order.item}</option>
                    {sauceTypes
                      .filter(sauce => sauce !== order.item)
                      .map(sauce => (
                        <option key={sauce} value={sauce}>
                          {sauce}
                        </option>
                      ))}
                  </select>
                  <select
                    className="w-full border rounded p-1"
                    value={order.options.bone}
                    onChange={e => updateOrder(order.id, {
                      options: { ...order.options, bone: e.target.value }
                    })}
                  >
                    <option value="">Bone or Boneless</option>
                    <option>Bone</option>
                    <option>Boneless</option>
                  </select>
                  <select
                    className="w-full border rounded p-1"
                    value={order.options.size}
                    onChange={e => updateOrder(order.id, {
                      options: { ...order.options, size: e.target.value }
                    })}
                  >
                    <option value="">Select Size</option>
                    <option>Large</option>
                    <option>Small</option>
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sticky bottom button */}
        <div className="mt-4">
          <button
            onClick={() => removeAllOrders()}
            className="p-4 rounded w-full bg-white text-gray-900 font-extrabold"
          >
            REMOVE
          </button>
        </div>
      </div>

    </div>
  );
}
