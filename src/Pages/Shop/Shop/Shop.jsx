import React, { useContext, useEffect, useState } from "react";
import "./Shop.css";
import ProductItem from "../Product/ProductItem.jsx";
import Cart from "../../../components/Cart/Cart.jsx";
import { addToDb, getShoppingCart } from "../../../JS-Files/fakedb.js";
import { AuthContext } from "../../../Provider/AuthProvider.jsx";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import ProductItemSkl from "../Product/ProductItemSkl/ProductItemSkl.jsx";
// import { addToDb, getShoppingCart } from '../utilities/fakedb';

const Shop = () => {
  const { baseUrl } = useContext(AuthContext);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  // console.log("Inview: ", inView);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (inView) {
      setPage(page + 1);
    }
  }, [inView]);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`${baseUrl}/products?page=${page}`).then((res) => {
      const comeData = res.data;
      const newData = [...products, ...comeData];
      setProducts(newData);
      setLoading(false);
    });
  }, [page]);

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

  if (loading) {
    return (
      <div className="p-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {[1, 2, 3, 4, 5, 6].map((a, idx) => (
          <ProductItemSkl key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[5fr_1fr]">
      <div className="">
        {products.length > 0 && (
          <div>
            <div className="p-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  handleAddToCart={handleAddToCart}
                ></ProductItem>
              ))}
            </div>
            <div className="text-center mt-4" ref={ref}>
              <span className="loading loading-spinner loading-lg bg-warning"></span>
            </div>
          </div>
        )}
      </div>
      <div className="cart_Container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
