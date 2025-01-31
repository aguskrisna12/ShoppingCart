'useclient'

import Card from "@/Components/Card";
import { GetServerSideProps } from "next";
import { ProductInterface } from "@/type/Product";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import SearchBar from "@/Components/SearchBar";
import { useState, useEffect } from "react";
export default function Home({ data }: { data: ProductInterface[] }) {

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<ProductInterface[]>(data);

  useEffect(() => {
    const results = data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <Header />
      <SearchBar handleSearchProps={handleSearch} />
      <div className="container mx-auto px-4 mt-[4rem]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
          <Card data={filteredData} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://api.escuelajs.co/api/v1/products");
  const data = await response.json();
  return { props: { data } };
};
