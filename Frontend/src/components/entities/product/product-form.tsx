import { Button, Flex, IconButton, Text, TextArea, TextField } from "@radix-ui/themes";
import { FC, ReactNode, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

import { Product, ProductProperty } from "../../../models/product";

interface IProductFormProps {
  children?: ReactNode;
  initialData?: Product;
  onChange?: (updatedProduct: Product) => void;
}

export const ProductForm: FC<IProductFormProps> = ({ children, initialData, onChange }) => {
  const [formState, setFormState] = useState<Product>(
    initialData ?? {
      id: -1,
      name: "",
      description: "",
      images: [],
      properties: [],
    }
  );

  useEffect(() => {
    onChange?.(formState);
  }, [formState, onChange]);

  const setValue = (key: keyof Product, value: any) => {
    setFormState({ ...formState, [key]: value });
  };

  const addImage = () => {
    setFormState({
      ...formState,
      images: [
        ...formState.images,
        {
          id: formState.images.length + 1,
          url: "",
        },
      ],
    });
  };

  const removeImage = (id: number) => {
    setFormState({ ...formState, images: formState.images.filter((image) => image.id !== id) });
  };

  const addProperty = () => {
    setFormState({
      ...formState,
      properties: [
        ...formState.properties,
        {
          id: formState.properties.length + 1,
          name: "",
          value: "",
        },
      ],
    });
  };

  const removeProperty = (id: number) => {
    setFormState({ ...formState, properties: formState.properties.filter((property) => property.id !== id) });
  };

  const setImageUrl = (id: number, value: string) => {
    for (const image of formState.images) {
      if (image.id === id) {
        setFormState({
          ...formState,
          images: [...formState.images.filter((image) => image.id !== id), { id, url: value }],
        });

        return;
      }
    }
  };

  const setProperty = <T extends keyof ProductProperty, K extends ProductProperty[T]>(id: number, key: T, value: K) => {
    for (const property of formState.properties) {
      if (property.id === id) {
        setFormState({
          ...formState,
          properties: [...formState.properties.filter((prop) => prop.id !== id), { ...property, [key]: value }],
        });

        return;
      }
    }
  };

  return (
    <>
      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Название
          </Text>
          <TextField.Root
            value={formState.name}
            onChange={(event) => setValue("name", event.target.value)}
            placeholder="Название"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Описание
          </Text>
          <TextArea
            value={formState.description}
            onChange={(event) => setValue("description", event.target.value)}
            placeholder="Описание"
          />
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Изображения
          </Text>

          {formState.images.map((image) => (
            <Flex gap="1" position="relative" flexGrow="1" key={image.id}>
              <TextField.Root
                value={image.url}
                placeholder="Ссылка на картинку"
                onChange={(event) => setImageUrl(image.id, event.target.value)}
                style={{ marginBottom: 5, width: "100%" }}
              />
              <IconButton variant="soft" color="red" onClick={() => removeImage(image.id)}>
                <FaTrash />
              </IconButton>
            </Flex>
          ))}

          <Button variant="ghost" onClick={addImage}>
            Добавить картинку
          </Button>
        </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Характеристики
          </Text>

          {formState.properties.map((property) => (
            <Flex gap="1" position="relative" flexGrow="1" key={property.id}>
              <Flex gap="1" style={{ marginBottom: 5 }}>
                <TextField.Root
                  value={property.name}
                  placeholder="Название"
                  onChange={(event) => setProperty(property.id, "name", event.target.value)}
                />
                <TextField.Root
                  value={property.value}
                  placeholder="Значение"
                  onChange={(event) => setProperty(property.id, "value", event.target.value)}
                />
              </Flex>
              <IconButton variant="soft" color="red" onClick={() => removeProperty(property.id)}>
                <FaTrash />
              </IconButton>
            </Flex>
          ))}

          <Button variant="ghost" onClick={addProperty}>
            Добавить характеристику
          </Button>
        </label>
      </Flex>

      {/* Controls */}
      {children}
    </>
  );
};
