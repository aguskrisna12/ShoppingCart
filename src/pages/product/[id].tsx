"use client";

import { ProductInterface } from "@/type/Product";
import Spinner from "@/Components/Spinner";
import { useRouter } from "next/router";
import useSWR from "swr";
import BackToHomeButton from "@/Components/BackToHomeButton";
import Carausel from "@/Components/Carausel";
import AddToCartButton from "@/Components/AddToCartButton";
import Description from "@/Components/Description";
const DisplayProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleAddToCart = (product: ProductInterface) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Product added to cart!");
  };

  console.log(id);

  const fetcher = (url: any) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `https://api.escuelajs.co/api/v1/products/${id}`,
    fetcher
  );

  console.log(data)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto mt-[7rem] px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <BackToHomeButton />
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-1 border-gray-200">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2">
               <Carausel dataImagesProps={data.images}/>
              </div>
              <div className="lg:w-1/2 p-6 lg:p-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  {data.title}
                </h1>
                <p className="text-xl font-semibold text-green-700 mb-6">
                  ${data.price}
                </p>
                <div className="prose prose-lg mb-8">
                  <Description itemDescriptionProps={data.description}/>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <AddToCartButton itemProps={data}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayProduct;
