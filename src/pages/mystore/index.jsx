import React from "react";
import { useStore } from "../../apps/myzustand";
import { Link } from "react-router-dom";

export default function Mystore() {
  const { cart, increment, decrement, deleteitem } = useStore((state) => state);
  console.log(cart);

  return (
    <>
      <div className="flex flex-col items-center mt-5 mb-5">
        <Link className="btn btn-outline btn-primary" to={"/"}>
          Back to home
        </Link>
      </div>
      <div className="container grid grid-cols-3 gap-10 ">
        {cart &&
          cart.map(({ id, img, price, title, count }) => {
            return (
              <div
                key={id}
                className="card w-96 bg-base-100 shadow-[0_2px_15px_0_rgba(255,0,255)]   containerr"
              >
                <figure>
                  <img
                    width={280}
                    height={230}
                    className="w-[280px] h-[230px] object-scale-down object-center"
                    src={img[0]}
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {title}
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <div className="card-actions justify-end ">
                    <div className="badge badge-outline p-4">
                      Product count - {count}
                    </div>
                    <div className="badge badge-outline p-4">
                      Price - {price}💲
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center p-2 ">
                  <hr
                    style={{
                      border: "1px solid white",
                      width: "100%",
                      marginBottom: "15px",
                    }}
                  />
                  <svg
                    onClick={() => deleteitem(id)}
                    style={{ cursor: "pointer" }}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                  >
                    <path
                      d="M3 6H5H21"
                      stroke="#ff0000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                      stroke="#ff0000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10 11V17"
                      stroke="#ff0000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14 11V17"
                      stroke="#ff0000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
