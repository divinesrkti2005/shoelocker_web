import React, { useState } from "react";
import api from "../../../api"; // <-- Import our new API utility

const AddSneakers = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    availableSizes: [{ size: "", quantity: "" }],
    category: "Running",
    image: null,
    colors: [""],
    featured: false,
    material: "",
    condition: "New",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleArrayChange = (field, index, subField, value) => {
    const newArray = [...formData[field]];
    if (subField) {
      newArray[index][subField] = value;
    } else {
      newArray[index] = value;
    }
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field) => {
    const newItem = field === "availableSizes" ? { size: "", quantity: "" } : "";
    setFormData({ ...formData, [field]: [...formData[field], newItem] });
  };

  const removeArrayField = (field, index) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "availableSizes" || key === "colors") {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      // Use the 'api' utility which includes the auth header automatically
      await api.post("/shoes", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Sneaker product added successfully!");
      // Reset form
      setFormData({
        name: "",
        description: "",
        brand: "",
        price: "",
        availableSizes: [{ size: "", quantity: "" }],
        category: "Running",
        image: null,
        colors: [""],
        featured: false,
        material: "",
        condition: "New",
      });
      // Clear file input if possible (requires a ref, simple reset for now)
      e.target.reset(); 
    } catch (err) {
      setError(err.response?.data?.message || "Error adding sneaker product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-blue-100">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Add New Sneaker Product</h2>
      {message && <p className="text-green-600 bg-green-50 p-3 rounded-lg mb-4">{message}</p>}
      {error && <p className="text-red-600 bg-red-50 p-3 rounded-lg mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Nike Air Max 270" required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g., Nike, Adidas, Jordan" required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="12999" required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
              <option value="Running">Running</option>
              <option value="Basketball">Basketball</option>
              <option value="Casual">Casual</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Athletic">Athletic</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Condition</label>
            <select name="condition" value={formData.condition} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Material</label>
            <input type="text" name="material" value={formData.material} onChange={handleChange} placeholder="e.g., Mesh, Leather, Canvas" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe the sneaker features, comfort, style, etc." required rows="4" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image</label>
          <input type="file" name="image" onChange={handleFileChange} required accept="image/*" className="w-full p-3 border border-gray-300 rounded-xl" />
          <p className="text-sm text-gray-500 mt-1">Upload a high-quality image of the sneaker</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-800 mb-3">👟 Available Sizes & Quantities</h3>
          {formData.availableSizes.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-4 mb-2">
              <input type="number" value={item.size} onChange={(e) => handleArrayChange("availableSizes", index, "size", e.target.value)} placeholder="Size (e.g., 9)" className="w-full p-3 border border-gray-300 rounded-xl" />
              <input type="number" value={item.quantity} onChange={(e) => handleArrayChange("availableSizes", index, "quantity", e.target.value)} placeholder="Quantity (e.g., 20)" className="w-full p-3 border border-gray-300 rounded-xl" />
              <button type="button" onClick={() => removeArrayField("availableSizes", index)} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayField("availableSizes")} className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600">Add Size</button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-800 mb-3">🎨 Colors</h3>
          {formData.colors.map((color, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-2 mb-2">
              <input type="text" value={color} onChange={(e) => handleArrayChange("colors", index, null, e.target.value)} placeholder="e.g., Red, Blue/White" className="w-full p-3 border border-gray-300 rounded-xl" />
              <button type="button" onClick={() => removeArrayField("colors", index)} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayField("colors")} className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600">Add Color</button>
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="featured" id="featured" checked={formData.featured} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">Mark as Featured</label>
        </div>
        <div className="text-center">
          <button type="submit" disabled={loading} className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-blue-300 transition-all duration-300">
            {loading ? "Adding Sneaker..." : "Add Sneaker Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSneakers;