import React from "react";
import { BsCartPlusFill } from "react-icons/bs";
import { serverUrl } from "../../lib/serverurl";

export default function ProductCard({ item }) {
  return (
    <div
      className="w-60 h-72 rounded-lg relative bg-cover bg-center border-2"
      style={{
        backgroundImage: `url(${serverUrl}/files/${item["@collectionName"]}/${item["id"]}/${item.image})`,
      }}
    >
      <div className="absolute bottom-0 bg-opacity-70 bg-gray-300 py-2 w-full flex justify-between px-3 rounded-b-lg">
        <div className="flex flex-col">
          <span className="font-semibold">{item.name}</span>
          <span className="text-sm">{item.price} TK</span>
          <span className="text-xs">{item.unit}</span>
        </div>
        <div className="flex justify-center">
          <button>
            <BsCartPlusFill size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}
