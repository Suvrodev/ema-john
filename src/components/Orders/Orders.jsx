import React, { useEffect, useState } from "react";
import "./Orders.css";

import Cart from "../Cart/Cart";
import { useLoaderData } from "react-router-dom";

const Orders = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleRemoveFromCart = (id) => {
    const RemainingCart = cart.filter((product) => product._id !== id);
    console.log(cart, id);
    setCart(RemainingCart);
    removeFromDb(id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="shop_container">
      <div className="review_container">
        {cart.map((product) => (
          <ReviewItem
            key={product._id}
            product={product}
            handleRemoveFromCart={handleRemoveFromCart}
          ></ReviewItem>
        ))}
      </div>

      <div className="Cart_Container">
        <Cart cart={cart} handleClearCart={handleClearCart}>
          <div className="cartLinkbtn">
            <Link to="/checkout">
              <button className="btn_proceed">
                Proceed CheckOut
                <FontAwesomeIcon className="delete-icon_" icon={faCreditCard} />
              </button>
            </Link>
          </div>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
