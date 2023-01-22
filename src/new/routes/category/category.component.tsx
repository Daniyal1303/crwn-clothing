import ProductCard from "../../components/product-card/product-card.component";

import { useContext, useState, useEffect, Fragment } from "react";

import { useParams } from "react-router-dom";

import { CategoriesContext } from "../../contexts/categories.context";

import "./category.styles.scss";

interface productData {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  console.log(categoriesMap[category as string]);

  const [products, setProducts] = useState(categoriesMap[category as string]);

  useEffect(() => {
    setProducts(categoriesMap[category as string]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category?.toUpperCase()}</h2>

      <div className="category-container">
        {products &&
          products.map((product: productData) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};
export default Category;
