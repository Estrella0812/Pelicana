'use client';

import { useState } from "react";

type MenuCategory = "Soup" | "Chicken" | "Side Menu" | "Drink";

// Use it in your state and object
const menuCategories: MenuCategory[] = ["Soup", "Chicken", "Side Menu", "Drink"];

const menuItems: Record<MenuCategory, string[]> = {
  Soup: ["Kimchi Stew", "Soybean Stew"],
  Chicken: ["Fried Chicken", "Spicy Chicken"],
  "Side Menu": ["Fries", "Rice"],
  Drink: ["Coke", "Sprite"]
};

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>("Soup");
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

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left: Menu List */}
      <div className="w-2/3 p-4 overflow-auto">
        <nav className="flex gap-4 mb-4">
          {menuCategories.map(cat => (
            <button
              key={cat}
              className={`px-4 py-2 rounded ${selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-200"}`}

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
              className="bg-yellow-200 hover:bg-yellow-300 p-4 rounded shadow"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Order Summary */}
      <div className="w-1/3 bg-gray-100 p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-2">Order Summary</h2>
        {orders.map(order => (
          <div key={order.id} className="bg-white p-3 rounded shadow mb-2">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{order.item}</p>
                <p className="text-sm text-gray-500">{order.category}</p>
              </div>
              <button onClick={() => removeOrder(order.id)} className="text-red-500">✕</button>
            </div>
            {order.category === "Chicken" && (
              <div className="mt-2 space-y-1">
                <select
                  className="w-full border rounded p-1"
                  value={order.options.sauce}
                  onChange={e => updateOrder(order.id, {
                    options: { ...order.options, sauce: e.target.value }
                  })}
                >
                  <option value="">Select Sauce</option>
                  <option>Spicy</option>
                  <option>Sweet Garlic</option>
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
    </div>
  );
}
