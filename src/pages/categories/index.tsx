"use client";

import { ProductInterface } from "@/type/Product";
import { CategoryInterface } from "@/type/Product";
import { GetServerSideProps } from "next";
import { useState } from "react";
import Header from "@/layout/Header";
import Description from "@/Components/Description";
import Price from "@/Components/Price";
import Title from "@/Components/Title";
import Image from "@/Components/Image";
import SeeDetailButton from "@/Components/SeeDetailButton";
import AddToCartButton from "@/Components/AddToCartButton";
import Spinner from "@/Components/Spinner";

export default function Index({ dataCategories }: { dataCategories: CategoryInterface[] }) {

  const [selectedCategory, setSelectedCategory] = useState<{ id: number; products: ProductInterface[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClickCategory = async (categoryId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
      const products = await response.json();
      setSelectedCategory({
        id: categoryId,
        products
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const maxString = (str: string, maxLength: number) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
      }
    return str;
  };
  return (
    <>
      <Header />
      <div className="container mx-auto mt-[8rem] px-4">
        <div className="flex">
          <div className="w-1/4 pr-4">
            <h1 className="text-2xl font-bold my-4">Categories</h1>
            <div className="flex flex-col space-y-2">
              {dataCategories.map((category) => (
                <button key={category.id} className="border p-4 rounded-lg hover:bg-gray-100 cursor-pointer" onClick={() => handleClickCategory(category.id)}>
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                </button>
              ))}
            </div>
          </div>
          <div className="w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
              {selectedCategory && selectedCategory.products ? (
                selectedCategory.products.map((product: ProductInterface) => (
                  <div key={product.id} className="border flex flex-col gap-3 bg-white rounded-lg p-4">
                    <Image itemImageProps={product.images[0]}/>
                    <Title itemTitleProps={product.title}/>
                    <Description itemDescriptionProps={maxString(product.description, 100)}/>
                    <Price itemPriceProps={product.price}/>
                    <div className="flex flex-col sm:flex-row gap-2 justify-between mt-auto">
                      <SeeDetailButton itemIdProps={product.id} />
                      <AddToCartButton itemProps={product} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  {loading ? (<Spinner />) : (<p className="text-gray-500">Select a category to view products</p>)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://api.escuelajs.co/api/v1/categories");
  const data = await response.json();
  return { props: { dataCategories: data.slice(0, 10) } };
};