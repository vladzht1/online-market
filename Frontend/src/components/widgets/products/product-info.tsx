import { Box, Flex, Separator, Text } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

import styled from "styled-components";
import { getProductById } from "../../../api/products";
import { Product } from "../../../models/product";
import { MessageReceiver } from "../../../shared/types";
import { DeleteProductModal } from "../../features/products/delete-product-modal";
import { EditProductModal } from "../../features/products/edit-product-modal";
import { DeleteButton } from "../../shared/form/delete-button";
import { EditButton } from "../../shared/form/edit-button";
import { ImageSlider } from "../../shared/image-slider";
import { LoadingArea } from "../../shared/loading-area";

interface IProductInfoProps {
  productId: number;
  redirectBack: () => void;
}

export const ProductInfo: FC<IProductInfoProps> = ({ productId, redirectBack }) => {
  const { data, isFetching, isError, refetch } = useQuery(
    "single-product",
    async () => await getProductById(productId),
    {
      keepPreviousData: true,
    }
  );

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (isError) {
      redirectBack();
      return;
    }

    if (data) {
      setProduct(data.data);
      return;
    }
  }, [data, isError, product, redirectBack]);

  const onUpdate: MessageReceiver = (_, __, success) => {
    if (success) {
      console.log("Refetching data");
      refetch();
    }
  };

  const onDelete = () => {
    redirectBack();
  };

  return (
    <>
      <LoadingArea show={isFetching && !product} />

      {product && (
        <Flex gap="2">
          <ImageSlider images={product.images.map((image) => image.url)} size={500} />

          <Box width="100%">
            <Flex justify="between" width="100%">
              <Text size="6" weight="bold">
                {product.name}
              </Text>
              <Flex gap="2">
                <EditProductModal product={product} callback={onUpdate}>
                  <EditButton />
                </EditProductModal>
                <DeleteProductModal productId={product.id} callback={onDelete}>
                  <DeleteButton />
                </DeleteProductModal>
              </Flex>
            </Flex>
            <Text as="div">{product.description}</Text>

            <Box pt="3">
              <Text size="3" weight="bold">
                Характеристики
              </Text>

              <Flex direction="column" width="100%">
                {product.properties.map((prop) => (
                  <ProductPropertyLine>
                    <Text weight="bold">{prop.name}</Text>
                    <Text>{prop.value}</Text>
                  </ProductPropertyLine>
                ))}
              </Flex>
            </Box>
          </Box>
        </Flex>
      )}
    </>
  );
};

const ProductPropertyLine = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px 4px;
  border-radius: 3px;

  &:hover {
    background-color: #f5f5f5;
  }
`;
