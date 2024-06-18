import React, { useEffect, useState } from "react";
import ProductsHandler from "../../handler/ProductsHandler";
import { CategoryButton } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../redux/product/productFilterSlice";

const ProductFilters = () => {
    const { getProductsCategoriesHandler } = ProductsHandler();
    const dispatch = useDispatch();
    
    const [categories, setCategories] = useState([]);

    // const filter = useSelector((state) => state.filter.filter);

    const onButtonClick = (value) => {
        dispatch(setFilter(value));
    }

    useEffect(() => {
      getProductsCategoriesHandler()
        .then((data) => {
        //   console.log(data);
          setCategories(data.data.data);
        })
        .catch((err) => console.log(err));
    }, []);

    return (
      <div className="flex items-center gap-2">
        <CategoryButton text={'all'} onClick={() => onButtonClick('all')}>All</CategoryButton>
        {categories.map((item, index) => (
          <CategoryButton key={index} text={item} onClick={() => onButtonClick(item)}>
            {item}
          </CategoryButton>
        ))}
      </div>
    );
};

export default ProductFilters;
