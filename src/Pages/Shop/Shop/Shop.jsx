import React, { useEffect, useState } from "react";
import "./Shop.css";
import ProductItem from "../Product/ProductItem.jsx";
import Cart from "../../../components/Cart/Cart.jsx";
import { addToDb, getShoppingCart } from "../../../JS-Files/fakedb.js";
// import { addToDb, getShoppingCart } from '../utilities/fakedb';

const Shop = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  ///Retrive from Cart start
  useEffect(() => {
    const storedCart = getShoppingCart();
    let savedCart = [];
    // console.log("Stored Cart: ",storedCart);

    ///Step-1: get id of the added product
    for (const id in storedCart) {
      //Step-2: get product from db by using id
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        // console.log("Added Product");
        // console.log(addedProduct);

        ///Step-3 Check Quantity from local storage
        const quanity = storedCart[id];
        // console.log("Quantity: ",quanity);

        //Step-3: Add quantity
        addedProduct.quantity = quanity;

        // console.log("Now Added Product: ");
        // console.log(addedProduct);

        //Step-4: Add the added Product to the saved cart
        savedCart.push(addedProduct);
      }
    }
    //Step-5: set the cart
    setCart(savedCart);
  }, [products]);

  ///Retrive from Cart end

  // Add to Cart Start
  const [cart, setCart] = useState([]);
  const handleAddToCart = (product) => {
    //Previous
    console.log("Click: ", product);
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id);

    /// if product doesn't exists in the cart, then set quantity = 1
    // but if exists update the quantity by 1

    //New
    // let newCart=[]
    // const exists=cart.find(pd=>pd.id === product.id)
    // if(!exists){
    //     product.quanity=1;
    //     newCart=[...cart,product]
    // }
    // else{
    //     exists.quanity= exists.quanity + 1;
    //     const remaining = cart.filter(pd=>pd.id !== product.id)
    //     newCart = [...remaining,exists];
    // }
    // setCart(newCart)
    // addToDb(product.id)
  };
  // Add to Cart End

  return (
    <div className="grid grid-cols-1 md:grid-cols-[5fr_1fr]">
      <div className="p-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* <h2>Products Comming Here: {products.length} </h2> */}
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></ProductItem>
        ))}
      </div>
      <div className="cart_Container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
