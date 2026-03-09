// import { createContext, useContext, useState } from "react";

// const InventoryContext = createContext();

// export const InventoryProvider = ({ children }) => {
//   const [items, setItems] = useState([
//     { id: 1, name: "Brake Pad", qty: 10, reserved: 0, price: 500 },
//     { id: 2, name: "Oil Filter", qty: 15, reserved: 0, price: 200 },
//   ]);

//   // Add Item
//   const addItem = (newItem) => {
//     setItems((prev) => [...prev, newItem]);
//   };

//   // Increase Stock manually
//   const increaseStock = (id) => {
//     setItems((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, qty: item.qty + 1 } : item
//       )
//     );
//   };

//   // Reserve stock (from job card)
//   const reserveStock = (id, quantity) => {
//     setItems((prev) =>
//       prev.map((item) =>
//         item.id === id && item.qty - item.reserved >= quantity
//           ? { ...item, reserved: item.reserved + quantity }
//           : item
//       )
//     );
//   };

//   // Deduct stock when job closed
//   const deductStock = (id, quantity) => {
//     setItems((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               qty: item.qty - quantity,
//               reserved: item.reserved - quantity,
//             }
//           : item
//       )
//     );
//   };

//   return (
//     <InventoryContext.Provider
//       value={{
//         items,
//         addItem,
//         increaseStock,
//         reserveStock,
//         deductStock,
//       }}
//     >
//       {children}
//     </InventoryContext.Provider>
//   );
// };

// export const useInventory = () => useContext(InventoryContext);

import { createContext, useContext, useState } from "react";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([
    { id: 1, name: "Brake Pad", qty: 10, reserved: 0, price: 500 },
    { id: 2, name: "Oil Filter", qty: 15, reserved: 0, price: 200 },
  ]);

  const addItem = (item) => {
    setItems((prev) => [...prev, item]);
  };

  const updateItem = (id, updatedData) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      )
    );
  };

  const increaseStock = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const reserveStock = (id, quantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id &&
        item.qty - item.reserved >= quantity
          ? { ...item, reserved: item.reserved + quantity }
          : item
      )
    );
  };

  const deductStock = (id, quantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: item.qty - quantity,
              reserved: item.reserved - quantity,
            }
          : item
      )
    );
  };

  return (
    <InventoryContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        increaseStock,
        reserveStock,
        deductStock,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);