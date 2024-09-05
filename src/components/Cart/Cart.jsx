import React from "react";
import "./Cart.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const Cart = ({ cart }) => {
  console.log("Cart:", cart);

  let totalPrice = 0;
  let totalShipping = 0;
  let quantity = 0;
  for (const product of cart) {
    totalPrice = totalPrice + product.price * product.quantity;
    totalShipping = totalShipping + product.shipping;

    if (product.quantity === 0) {
      product.quantity = 1;
      quantity = 1;
    } else {
      console.log("Old Quantity: ", quantity);
      quantity = quantity + product.quantity;
      console.log("Now Quantity: ", quantity);
    }
  }

  const tax = (totalPrice * 7) / 100;
  const grandTotal = totalPrice + totalShipping + tax;

  return (
    <div className="cart">
      <h4 className="text-xl font-bold text-center mb-10">Order Summery</h4>

      <div className="flex flex-col gap-2">
        <p>Selected Items: {quantity} </p>
        <p>Total Price: ${totalPrice} </p>
        <p>Total Shipping: ${totalShipping} </p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <h1 className="font-bold">Grand Total: ${grandTotal.toFixed(2)} </h1>
      </div>

      <div className="my-4 flex flex-col gap-4">
        <div className="w-full py-2 px-4 bg-[#FF3030] flex items-center gap-2 text-white rounded-md justify-center">
          Clear Cart
          <DeleteIcon />
        </div>

        <div className="w-full py-2 px-4 bg-[#FF9900] flex items-center  text-white rounded-md justify-center">
          Review Order
          <ArrowRightAltIcon />
        </div>
      </div>
    </div>
  );
};

export default Cart;
