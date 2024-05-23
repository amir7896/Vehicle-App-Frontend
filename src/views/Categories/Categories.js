import React from "react";
import { CategoriesList } from "./components";
import { useQuery } from "react-query";
import CategoryApi from "../../services/apis/Category.Api";

const Categories = () => {
  // Get categories api call
  const { data, refetch: refetchCategories } = useQuery("GET_CATEGORIES", () =>
    CategoryApi.getCategories()
  );

  return (
    <>
      <CategoriesList data={data} refetch={refetchCategories} />
    </>
  );
};

export default Categories;
