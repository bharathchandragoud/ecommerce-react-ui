import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import `useNavigate`
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const CreateProductPage = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
    // setProduct({...product, image: e.target.files[0]})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    axios
      .post("http://localhost:8080/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product added successfully:", response.data);
        alert("Product added successfully");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error adding product");
      });
  };

  const navigate = useNavigate(); // Initialize navigation function

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Product
      </Typography>
      <Stack spacing={2} sx={{ maxWidth: 400 }}>
        <TextField label="Name" name="name" onChange={handleChange} required />
        <TextField
          label="Description"
          name="description"
          multiline
          rows={3}
          onChange={handleChange}
          required
        />
        <TextField
          label="Brand"
          name="brand"
          onChange={handleChange}
          required
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          onChange={handleChange}
          required
        />
        <TextField
          label="Category"
          name="category"
          onChange={handleChange}
          required
        />
        <TextField
          label="Release Date"
          name="releaseDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
          required
        />
        <TextField
          label="Stock Quantity"
          name="stockQuantity"
          type="number"
          onChange={handleChange}
          required
        />
        <FormControlLabel
          control={<Checkbox name="productAvailable" onChange={handleChange} />}
          label="Available"
        />
        <Button variant="contained" component="label">
          Upload Image
          <input type="file" hidden onChange={handleImageUpload} />
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Product
        </Button>
      </Stack>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </Container>
  );
};

export default CreateProductPage;
