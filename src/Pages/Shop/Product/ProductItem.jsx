import React from "react";
import "./ProductItem.css";

import { FaCartPlus } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ProductItem = ({ product, handleAddToCart }) => {
  // console.log(product);
  const { id, img, name, price, seller, ratings } = product;

  return (
    <div className="border border-[#95a0a7] w-full md:w-[250px] lg:w-[270px] h-[480px] rounded-lg relative">
      <img
        className="w-[286px] h-[286px] mx-auto rounded-lg mt-2"
        src={img}
        alt=""
      />
      <div className="ml-4">
        <h6 className="text-[#0e161a] text-[21px] font-lato font-normal tracking-[0.03px] mt-0 mb-0 truncate">
          {name}
        </h6>
        <p className="text-[#0e161a] text-[17px] font-lato font-normal tracking-[0.03px] mt-1">
          Price: ${price}
        </p>
        <p className="text-[#2a414f] text-[12px] font-lato font-normal tracking-[0.05px] mt-1">
          Manufacturer: {seller}
        </p>
        <p className="text-[12px] font-lato font-normal tracking-[0.05px] mt-1">
          <Rating value={ratings} className="rt" />
        </p>
      </div>
      <button
        onClick={() => handleAddToCart(product)}
        className="absolute bottom-0 w-full bg-orange-400 hover:bg-[#ff4500] text-white p-3 flex items-center justify-center gap-2 rounded-b-lg"
      >
        Add to Cart <FaCartPlus />
      </button>
    </div>
  );
};

export default ProductItem;
