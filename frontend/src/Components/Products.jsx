import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getScrews } from "../Services/Actions/screwAction";
import { getPlates } from "../Services/Actions/plateAction.js";
import { getBolts } from "../Services/Actions/boltAction.js";
import { useParams } from "react-router-dom";
import "./Products.css";
import { addToCart } from "../Services/Actions/cartAction";

const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  let { keyword } = useParams();
  const [quantity, setQuantity] = useState(0);


  

  
  useEffect(() => {
    dispatch(getPlates());
    dispatch(getScrews(keyword, currentPage));
    dispatch(getBolts());
  }, [dispatch, keyword, currentPage]);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  const { screws } = useSelector((state) => state.screws);
  const { bolts } = useSelector((state) => state.bolts);
  const { plates } = useSelector((state) => state.plates);

  const filterTypeRedux = useSelector((state) => state.filter.filterType);
  let a;

  if (filterTypeRedux === "plates") {
    a = plates ? plates.plates : [];
  } else if (filterTypeRedux === "bolts") {
    a = bolts ? bolts.bolts : [];
  } else {
    a = screws ? screws.screws : [];
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: a._id,
      Description: a.Description,
      Standard: a.SpecifiedStandard,
      Certification: a.CertificationStatus,
      Brand: a.brand,
      Price: 10,
      Quantity: quantity,
    };
    dispatch(addToCart(cartItem));
    alert(`You added ${quantity} ${a.name} to the cart`);
  };
  

  return (
    <div>
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>Part Number</th>
            <th>Description</th>
            <th>Brand</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {a &&
            a.map((product, index) => (
              <tr key={index}>
                <td>
                  <a href={`#${product.productNo}`}>{product.partNo}</a>
                </td>
                <td>{product.description}</td>
                <td>{product.brand}</td>
                <td>
                  <input type="number" min="1" id="quantity" name="quantity" value={quantity} />
                </td>
                <td>
                  <button onClick={handleAddToCart}>Add to Cart</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;