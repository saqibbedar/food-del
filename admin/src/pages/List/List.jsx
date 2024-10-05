import { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { url } from "../../assets/assets";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);
  const [itemId, setItemId] = useState(null);
  const [isEditorHidden, setIsEditorHidden] = useState(true);
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  const removeFood = async (foodID) => {
    const response = await axios.delete(`${url}/api/food/remove`, {
      params: { id: foodID },
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const updateFood = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    if (image) formData.append("image", image);
    formData.append("foodId", itemId);

    const response = await axios.put(`${url}/api/food/update`, formData);
    if (response.data.success) {
      toast.success(response.data.message);
      setIsEditorHidden(true);
      fetchList();
    } else {
      toast.error(response.data.message);
    }
  };

  const handleEditClick = (item) => {
    setItemId(item._id);
    setData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
    });
    setIsEditorHidden(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p className="update-remove-food">
              <span
                onClick={() => removeFood(item._id)}
                title="Remove Food"
                className="remove-food"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  height="19px"
                  width="19px"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4z"></path>
                </svg>
              </span>
              <span
                onClick={() => handleEditClick(item)}
                title="Edit Food"
                className="update-food"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  height="19px"
                  width="19px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 5.63l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 0 0 0-1.41z"></path>
                </svg>
              </span>
            </p>
          </div>
        ))}
        <div
          className="edit-food"
          style={{ display: isEditorHidden ? "none" : "grid" }}
        >
          <div className="food-editor">
            <header>
              <h3>Edit food</h3>
              <div
                onClick={() => {
                  setIsEditorHidden(!isEditorHidden);
                  setImage(false);
                }}
                style={{ cursor: "pointer" }}
              >
                close
              </div>
            </header>
            <form onSubmit={updateFood}>
              {list
                .filter((item) => item._id === itemId)
                .map((item, index) => (
                  <div key={index} className="editor-table-format">
                    <div>
                      <label htmlFor="image">
                        <img
                          src={
                            image
                              ? URL.createObjectURL(image)
                              : `${url}/images/` + item.image
                          }
                          alt=""
                        />
                      </label>
                      <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        hidden
                      />
                    </div>
                    <input
                      name="name"
                      onChange={handleChange}
                      value={data.name}
                      type="text"
                      placeholder="Food Name"
                    />
                    <input
                      name="description"
                      onChange={handleChange}
                      value={data.description}
                      type="text"
                      placeholder="Description"
                    />
                    <input
                      name="price"
                      onChange={handleChange}
                      value={data.price}
                      type="text"
                      placeholder="Price"
                    />
                    <select
                      name="category"
                      onChange={handleChange}
                      value={data.category}
                    >
                      <option value={data.category}>{data.category}</option>
                      {[
                        "Salad",
                        "Rolls",
                        "Deserts",
                        "Sandwich",
                        "Cake",
                        "Pure Veg",
                        "Pasta",
                        "Noodles",
                      ]
                        .filter((option) => option !== data.category)
                        .map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                    </select>

                    <button type="submit">Update</button>
                  </div>
                ))}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
