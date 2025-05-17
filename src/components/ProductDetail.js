import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"; // Import `useNavigate`

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); // Initialize navigation function

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/product/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          image={`data:image/jpeg;base64,${product.imageDate}`}
          alt={product.name}
          style={{ maxWidth: "200px" }}
          height="300"
        />
        <CardContent>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="body2">{product.description}</Typography>
          <Typography variant="h6">Brand: {product.brand}</Typography>
          <Typography variant="h6">Price: ₹{product.price}</Typography>
          <Typography variant="h6">Category: {product.category}</Typography>
          <Button variant="contained" color="primary">
            Add to Cart
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
    </Container>
  );
};

export default ProductDetail;
