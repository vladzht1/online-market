import { Button, Callout, DataList, HoverCard, Popover, Table } from "@radix-ui/themes";
import { FC, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { getAllProducts } from "../../../api/products";
import { Product, ProductProperty } from "../../../models/product";
import { MessageReceiver, MessageType } from "../../../shared/types";
import { DeleteProductModal } from "../../features/products/delete-product-modal";
import { EditProductModal } from "../../features/products/edit-product-modal";
import { DeleteButton } from "../../shared/form/delete-button";
import { EditButton } from "../../shared/form/edit-button";
import { LoadingArea } from "../../shared/loading-area";

interface IProductsTableProps {
  messageReceiver?: MessageReceiver;
}

export const ProductsTable: FC<IProductsTableProps> = ({ messageReceiver }) => {
  const { data, isFetching, isError, error, remove } = useQuery("products", async () => await getAllProducts(), {
    keepPreviousData: true,
  });

  if (data) {
    console.log(data);
  }

  useEffect(() => {
    if (!isFetching && isError) {
      messageReceiver?.((error as any).response?.data?.message || (error as any).message, "ERROR", false);
      remove();
    }
  }, [error, isError, isFetching, messageReceiver, remove]);

  const handleAction = (message: string, messageType: MessageType, success: boolean) => {
    messageReceiver?.(message, messageType, success);
  };

  return (
    <>
      <LoadingArea show={isFetching && !data} />

      {data?.data && (
        <>
          {data.data.length > 0 ? (
            <Table.Root variant="surface">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Название</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Описание</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Характеристики</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Картинки</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.data.map((product: Product) => (
                  <Table.Row align="center" key={product.id}>
                    <Table.RowHeaderCell>{product.id}</Table.RowHeaderCell>
                    <Table.Cell>
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </Table.Cell>
                    <Table.Cell>{product.description}</Table.Cell>
                    <Table.Cell>
                      {product.properties && product.properties.length > 0 && (
                        <HoverCard.Root>
                          <HoverCard.Trigger>
                            <Button variant="ghost">Посмотреть характеристики</Button>
                          </HoverCard.Trigger>
                          <HoverCard.Content maxWidth="300px">
                            <DataList.Root>
                              {product.properties.map((property: ProductProperty) => (
                                <DataList.Item align="center">
                                  <DataList.Label>{property.name}</DataList.Label>
                                  <DataList.Value>{property.value}</DataList.Value>
                                </DataList.Item>
                              ))}
                            </DataList.Root>
                          </HoverCard.Content>
                        </HoverCard.Root>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {product.images && product.images.length > 0 && (
                        <Popover.Root>
                          <Popover.Trigger>
                            <Button variant="ghost">Картинки</Button>
                          </Popover.Trigger>
                          <Popover.Content width="360px">
                            {product.images.map((image) => (
                              <img
                                src={image.url}
                                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                                alt="img"
                              />
                            ))}
                          </Popover.Content>
                        </Popover.Root>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <EditProductModal product={product} callback={handleAction}>
                        <EditButton />
                      </EditProductModal>
                    </Table.Cell>
                    <Table.Cell>
                      <DeleteProductModal productId={product.id} callback={handleAction}>
                        <DeleteButton />
                      </DeleteProductModal>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          ) : (
            <Callout.Root color="gray" role="alert">
              <Callout.Icon>
                <FaInfoCircle />
              </Callout.Icon>
              <Callout.Text>Список продуктов пуст</Callout.Text>
            </Callout.Root>
          )}
        </>
      )}
    </>
  );
};
