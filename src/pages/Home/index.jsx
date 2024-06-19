import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useStore } from "../../apps/myzustand";

export default function Home() {
  const queryclient = useQueryClient();
  const [select, setSelect] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const { addtocart, cart, increment, decrement } = useStore((state) => state);
  console.log(increment);
  console.log(addtocart);
  const { data, isLoading, erorr } = useQuery({
    queryKey: [select, search, sort],
    queryFn: async () => {
      const url =
        select === "all"
          ? "https://dummyjson.com/products/search?q=" +
            search +
            "&sortBy=" +
            sort
          : `https://dummyjson.com/products/category/${select}?sortBy=${sort}`;
      const req = await fetch(url);
      const res = await req.json();
      return res?.products;
    },
  });
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const req = await fetch("https://dummyjson.com/products/categories");
      const res = await req.json();
      return res;
    },
  });
  console.log(categories);
  console.log(data);
  console.log(search);

  return (
    <>
      <section>
        <div className="container">
          <div className="flex items-center justify-between pb-4 border-b-2 mb-10">
            <h2 className="text-2xl">Products</h2>
            <div className="flex items-center gap-5">
              <label className="input input-sm input-bordered flex items-center gap-2">
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelect("all");
                  }}
                  type="text"
                  className="grow"
                  placeholder="Search"
                  // value={search}
                  // onChange={(e) => setsearch(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              {categories && (
                <select
                  value={select}
                  onChange={(e) => {
                    setSelect(e.target.value), setSearch("");
                  }}
                  className="select select-sm select-secondary w-full max-w-xs"
                >
                  <option value="all">Filter by Category</option>
                  {categories.map(({ slug, name, url }) => {
                    return (
                      <option key={slug} value={slug}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              )}

              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  console.log(e.target.value);
                }}
                className="select select-sm select-secondary w-full max-w-xs"
              >
                <option value="">Sort by</option>
                {["title", "price", "rating"].map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className=" mt-10 flex items-center justify-center">
            <span
              style={{ zoom: "2" }}
              className="loading loading-dots loading-lg"
            ></span>
          </div>
        )}
        {data?.length == 0 ? (
          <h1 className="text-center text-3xl">
            The product you were looking for was not found !
          </h1>
        ) : (
          <div className="container grid grid-cols-3 gap-10 ">
            {data &&
              data.map(({ id, images, price, rating, title }, ind) => {
                return (
                  <div
                    key={id}
                    className="card w-96 bg-base-100 shadow-[0_2px_15px_0_rgba(255,0,255)]   containerr"
                  >
                    <figure>
                      <img
                        width={300}
                        height={250}
                        className="w-[300px] h-[250px] object-scale-down object-center"
                        src={images[0]}
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">
                        {title}
                        <div className="badge badge-secondary">NEW</div>
                      </h2>
                      <div className="card-actions justify-end">
                        <div className="badge badge-outline p-3">
                          Price - {price}💲
                        </div>
                        <div className="badge badge-outline p-3">
                          Rating - {rating}⭐
                        </div>
                      </div>
                    </div>

                    {cart.findIndex((item) => item.id === id) != "-1" ? (
                      <div className="flex items-center justify-center gap-5">
                        <button
                          onClick={() => {
                            // if (
                            //   cart[cart.findIndex((item) => item.id === id)]
                            //     .count === 1
                            // ) {
                            //   return dispach(deleteitem(id));
                            // }
                            decrement(id);
                          }}
                          className="btn  btn-primary"
                        >
                          -
                        </button>
                        <p>
                          {cart[cart.findIndex((item) => item.id === id)].count}
                        </p>
                        <button
                          onClick={() => increment(id)}
                          className="btn  btn-primary"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addtocart(id)}
                        className="btn  btn-primary"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </section>
    </>
  );
}
