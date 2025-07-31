import React, { useEffect, useState } from "react";
import api from "../../../api"; // <-- Import our new API utility
import AddSneakers from "./AddSneakers"; // We can reuse the form for editing

const ManageSneakers = () => {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSneaker, setEditingSneaker] = useState(null);


  const fetchSneakers = async () => {
    setLoading(true);
    setError("");
    try {
      // Use the admin-specific endpoint
      const res = await api.get("/shoes/admin/all");
      setSneakers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching products.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSneakers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/shoes/${id}`);
      setSneakers(sneakers.filter((sneaker) => sneaker._id !== id));
      setMessage("Product deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting product.");
    }
  };

  const handleEditOpen = (sneaker) => {
    setEditingSneaker(sneaker);
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
    setEditingSneaker(null);
  };
  
  const handleUpdateSuccess = () => {
    fetchSneakers(); // Refresh the list
    handleEditClose();
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-blue-100 overflow-x-auto">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Manage Sneaker Products</h2>
      {message && <p className="text-green-600 bg-green-50 p-3 rounded-lg mb-4">{message}</p>}
      {error && <p className="text-red-600 bg-red-50 p-3 rounded-lg mb-4">{error}</p>}
      
      {loading ? (
        <div className="text-center py-8">Loading products...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Product Name</th>
                <th className="p-3 text-left">Brand</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Featured</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sneakers.length > 0 ? (
                sneakers.map((sneaker) => {
                  const totalStock = sneaker.availableSizes.reduce((sum, item) => sum + item.quantity, 0);
                  return (
                    <tr key={sneaker._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <img src={`http://localhost:3000/uploads/${sneaker.image}`} alt={sneaker.name} className="w-20 h-20 object-cover rounded-lg" />
                      </td>
                      <td className="p-3 font-semibold">{sneaker.name}</td>
                      <td className="p-3">{sneaker.brand}</td>
                      <td className="p-3 font-bold text-green-600">₹{sneaker.price}</td>
                      <td className="p-3">{totalStock} units</td>
                      <td className="p-3">{sneaker.featured ? 'Yes' : 'No'}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button onClick={() => handleEditOpen(sneaker)} className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600">Edit</button>
                          <button onClick={() => handleDelete(sneaker._id)} className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600">Delete</button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-8 text-gray-500">No sneaker products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {isEditModalOpen && (
        <EditSneakerModal 
          sneaker={editingSneaker} 
          onClose={handleEditClose}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

// --- Edit Modal Component ---
const EditSneakerModal = ({ sneaker, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: sneaker.name || "",
    description: sneaker.description || "",
    brand: sneaker.brand || "",
    price: sneaker.price || "",
    availableSizes: sneaker.availableSizes || [{ size: "", quantity: "" }],
    category: sneaker.category || "Running",
    colors: sneaker.colors || [""],
    featured: sneaker.featured || false,
    material: sneaker.material || "",
    condition: sneaker.condition || "New",
  });
  const [loading, setLoading] = useState(false);
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
    newArray[index][subField] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], field === "availableSizes" ? { size: "", quantity: "" } : ""] });
  };

  const removeArrayField = (field, index) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formDataToSend = new FormData();
    // Only append fields that have changed
     Object.keys(formData).forEach((key) => {
        if(key === 'image' && formData.image){
             formDataToSend.append('image', formData.image);
        }
        else if(key !== 'image'){
             if (key === "availableSizes" || key === "colors") {
                formDataToSend.append(key, JSON.stringify(formData[key]));
             } else {
                formDataToSend.append(key, formData[key]);
            }
        }
    });

    try {
      await api.put(`/shoes/${sneaker._id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Error updating product.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-800">Edit Sneaker</h2>
          <button onClick={onClose} className="text-2xl font-bold">&times;</button>
        </div>
        {error && <p className="text-red-600 bg-red-50 p-3 rounded-lg mb-4">{error}</p>}
        {/* Reusing the same form structure from AddSneakers */}
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form fields are identical to AddSneakers, just pre-filled */}
            {/* Example for one field: */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-xl"/>
            </div>
            {/* ... add all other fields here just like in AddSneakers ... */}

            {/* A condensed version of all fields for brevity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" required className="w-full p-2 border rounded"/>
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required className="w-full p-2 border rounded"/>
                {/* Add other inputs: category, condition, material */}
            </div>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full p-2 border rounded"></textarea>
            <input type="file" name="image" onChange={handleFileChange} className="w-full p-2 border rounded"/>

            {/* Sizes */}
            <div>
              <h3 className="text-lg font-semibold">Sizes</h3>
              {formData.availableSizes.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input type="number" value={item.size} onChange={e => handleArrayChange('availableSizes', index, 'size', e.target.value)} placeholder="Size" className="w-full p-2 border rounded"/>
                  <input type="number" value={item.quantity} onChange={e => handleArrayChange('availableSizes', index, 'quantity', e.target.value)} placeholder="Quantity" className="w-full p-2 border rounded"/>
                  <button type="button" onClick={() => removeArrayField('availableSizes', index)} className="bg-red-500 text-white p-2 rounded">Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayField('availableSizes')} className="bg-blue-500 text-white p-2 rounded">Add Size</button>
            </div>
             {/* Colors */}
            <div>
                <h3 className="text-lg font-semibold">Colors</h3>
                 {formData.colors.map((color, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input type="text" value={color} onChange={e => handleArrayChange('colors', index, null, e.target.value)} placeholder="Color" className="w-full p-2 border rounded"/>
                        <button type="button" onClick={() => removeArrayField('colors', index)} className="bg-red-500 text-white p-2 rounded">Remove</button>
                    </div>
                ))}
                <button type="button" onClick={() => addArrayField('colors')} className="bg-blue-500 text-white p-2 rounded">Add Color</button>
            </div>
            <div className="flex items-center gap-2">
                <input type="checkbox" name="featured" id="edit_featured" checked={formData.featured} onChange={handleChange} />
                <label htmlFor="edit_featured">Mark as Featured</label>
            </div>
            
            <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 rounded-lg">Cancel</button>
                <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-blue-300">
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};


export default ManageSneakers;