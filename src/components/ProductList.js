import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import `useNavigate`

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const navigate = useNavigate(); // Initialize navigation function
  return (
    <>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card>
            <CardMedia
              component="img"
              image={product.imageName}
              alt={product.name}
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
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </Grid>
      ))}
    </>
  );
};

export default ProductList;
