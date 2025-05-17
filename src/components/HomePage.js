import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  Drawer,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

      {/* Add Product Button */}
      <Button variant="contained" color="primary" component={Link} to="/create">
        Add New Product
      </Button>

      {/* Search Bar */}
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Filter */}
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        displayEmpty
        fullWidth
      >
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="Electronics">Electronics</MenuItem>
        <MenuItem value="Fashion">Fashion</MenuItem>
      </Select>

      {/* Product Grid */}
      {/* <Grid container spacing={2}>
        {products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(search.toLowerCase()) &&
              (category === "" || p.category === category)
          )
          .map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  image={`data:image/jpeg;base64,${product.imageDate}`}
                  alt={product.name}
                  style={{ maxWidth: "200px" }}
                />

                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">{product.description}</Typography>
                  <Typography variant="h6" color="primary">
                    ₹{product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid> */}
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card>
            <CardMedia
              component="img"
              image={`data:image/jpeg;base64,${product.imageDate}`}
              alt={product.name}
              style={{ maxWidth: "200px" }}
              height="200"
            />
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2">{product.description}</Typography>
              <Typography variant="h6" color="primary">
                ₹{product.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/product/${product.id}`}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {/* Cart Preview Drawer */}
      <Button variant="outlined" onClick={() => setCartOpen(true)}>
        View Cart ({cart.length})
      </Button>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Container>
          <Typography variant="h5">Cart Items</Typography>
          {cart.map((item, index) => (
            <Typography key={index}>
              {item.name} - ₹{item.price}
            </Typography>
          ))}
        </Container>
      </Drawer>
    </Container>
  );
};

export default ProductList;
