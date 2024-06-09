import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ContainerWithPadding } from "../components/shared/container";
import { Header } from "../components/widgets/header";
import { ProductInfo } from "../components/widgets/products/product-info";

export const SingleProductPage: FC = () => {
  const redirect = useNavigate();
  const { productId: productIdProp } = useParams();

  const [productId, setProductId] = useState(0);

  const redirectToAllProducts = useCallback(() => {
    redirect("/products");
  }, [redirect]);

  useEffect(() => {
    if (!productIdProp || isNaN(parseInt(productIdProp))) {
      redirectToAllProducts();
      return;
    }

    setProductId(parseInt(productIdProp));
  }, [productIdProp, redirectToAllProducts]);

  return (
    <>
      <Header />
      <ContainerWithPadding>
        {productId && <ProductInfo productId={productId} redirectBack={redirectToAllProducts} />}
      </ContainerWithPadding>
    </>
  );
};
