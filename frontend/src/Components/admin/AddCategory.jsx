import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../app/categories/categorythunk";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("image", image);

    const action = editData
      ? updateCategory({ id: editData._id, data })
      : createCategory(data);

    dispatch(action)
      .unwrap()
      .then(() => {
        toast.success(editData ? "Category Updated!" : "Category Added!");
        resetForm();
        dispatch(fetchCategories());
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const resetForm = () => {
    setName("");
    setImage(null);
    setEditData(null);
    setShowForm(false);
  };

  const handleEdit = (row) => {
    setEditData(row);
    setName(row.name);
    setImage(null);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this category?")) {
      dispatch(deleteCategory(id))
        .unwrap()
        .then(() => {
          toast.success("Category Deleted!");
          dispatch(fetchCategories());
        })
        .catch((err) => {
          toast.error(`Error: ${err.message || err}`);
        });
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      name: "S/N",
      cell: (row, index) => index + 1,
      width: "60px",
      center: true,
    },
    { name: "Name", selector: (row) => row.name },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="p-2 bg-blue-500 text-white rounded"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="p-2 bg-red-500 text-white rounded"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Category Management</h2>

      {/* Search Bar */}
      <div className="mb-4 relative">
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search categories by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        <FaPlus className="inline mr-2" /> Add Category
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-white p-4 shadow rounded"
        >
          <h3 className="text-xl mb-4">
            {editData ? "Edit Category" : "Add Category"}
          </h3>
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 px-3 py-2 border rounded"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              console.log("Selected file:", e.target.files[0]);
              setImage(e.target.files[0]);
            }}
            className="w-full mb-3 px-3 py-2 border rounded"
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={resetForm}
               disabled={loading}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {editData ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      )}

      <DataTable
        columns={columns}
        data={filteredCategories}
        progressPending={loading}
        pagination
        highlightOnHover
        responsive
        noDataComponent={
          searchTerm
            ? `No categories found matching "${searchTerm}"`
            : "No categories found"
        }

         paginationPerPage={10} 
  paginationRowsPerPageOptions={[5, 10, 20, 50, 100]} 

  paginationComponentOptions={{
    rowsPerPageText: `Rows per page (Total ${ filteredCategories.length})`,
    rangeSeparatorText: "of", 
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",

  }}


      />
    </div>
  );
};

export default AddCategory;
