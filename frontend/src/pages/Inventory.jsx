import { useState, useEffect } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { playSuccess, playDelete, playClick,} from "../utils/sound";

function Inventory() {

    const [items,setItems] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [rarity, setRarity] = useState("Common");

    const fetchInventory = async () => {
        console.log("Fetching inventory...");
  try {
    const token = localStorage.getItem("token");

    const res = await API.get("/inventory", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setItems(res.data);
  } catch (error) {
    console.log(error);
  }
};

const createItem = async () => {
  try {
    const token = localStorage.getItem("token");

    await API.post(
      "/inventory",
      {
        name,
        description,
        rarity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Clear the form
    setName("");
    setDescription("");
    setRarity("Common");

    // Reload inventory
    fetchInventory();
    toast.success("Item Added");
    playSuccess();

  } catch (error) {
    console.log(error);
    toast.error("Failed to add item");
  }
};

const deleteItem = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await API.delete(`/inventory/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchInventory();
    toast.success("Item Deleted");
    playDelete();

  } catch (error) {
    console.log(error);
    toast.error("Failed to delete item!");
  }
};

useEffect(() => {
    console.log("Inventory page loaded");
    fetchInventory();
}, []);

    return (
  <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-10">

    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-red-600 mb-3">
      🎒 Inventory
    </h1>

    <p className="text-gray-400 mb-10">
      Items collected during your missions.
      <p className="text-red-500 font-semibold mt-2">
Total Items: {items.length}
</p>
    </p>

    <div className="bg-[#111]/80 border border-red-900 rounded-xl p-5 sm:p-6 mb-8">
  <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-4">
    Add New Item
  </h2>

  <input
    type="text"
    placeholder="Item Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full mb-4 p-3 rounded bg-black border border-gray-700 text-white"
  />

  <textarea
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="w-full mb-4 p-3 rounded bg-black border border-gray-700 text-white"
  />

  <select
    value={rarity}
    onChange={(e) => setRarity(e.target.value)}
    className="w-full mb-4 p-3 rounded bg-black border border-gray-700 text-white"
  >
    <option>Common</option>
    <option>Rare</option>
    <option>Epic</option>
    <option>Legendary</option>
  </select>

  <button
  onClick={createItem}
    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold transition">
    Add Item
  </button>
</div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{items.length === 0 ? (

<div className="col-span-full bg-[#111]/80 border border-red-900 rounded-xl p-10 text-center">

<h2 className="text-3xl font-bold text-red-500">
🎒 Inventory Empty
</h2>

<p className="text-gray-400 mt-3">
Collect items during your missions to fill your inventory.
</p>

</div>

) : (

items.map((item) => (
    <div
      key={item._id}
      className="bg-[#111]/80 border border-red-900 rounded-xl p-5 sm:p-6 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300">
      <h2 className="text-2xl font-bold text-red-500">
        {item.name}
      </h2>

      <p className="text-gray-400 mt-3">
        {item.description}
      </p>

      <p className="text-xs text-gray-500 mt-2">
Collected:
{" "}
{new Date(item.createdAt).toLocaleDateString()}
</p>

      <div className="flex justify-between items-center mt-4">

  <span
    className={`px-3 py-1 rounded-full font-semibold ${
      item.rarity === "Legendary"
        ? "bg-yellow-500 text-black"
        : item.rarity === "Epic"
        ? "bg-purple-700"
        : item.rarity === "Rare"
        ? "bg-blue-700"
        : "bg-gray-600"
    }`}
  >
    {item.rarity}
  </span>

  <button
    onClick={() => {
if(window.confirm("Delete this item?")){
deleteItem(item._id);
}
}}
    className="bg-red-700 hover:bg-red-600 px-3 py-2 rounded-lg text-sm transition">
    🗑 Delete
  </button>

</div>
    </div>
  ))
  )}

</div>

  </div>
);
}

export default Inventory;