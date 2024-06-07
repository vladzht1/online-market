import { IconButton } from "@radix-ui/themes";
import { FC, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styled from "styled-components";

const DEFAULT_WRAPPER_SIZE = 300;

interface IImageSliderProps {
  images: string[];
  size?: number;
}

export const ImageSlider: FC<IImageSliderProps> = ({ images, size = DEFAULT_WRAPPER_SIZE }) => {
  const [activeImage, setActiveImage] = useState(0);

  const countNextIndexByOffset = (offset: number) => {
    if (offset === -1 && activeImage === 0) {
      return images.length - 1;
    }

    return (activeImage + offset) % images.length;
  };

  return (
    <SliderWrapper size={size}>
      {images.length > 1 && (
        <SliderActionButton onClick={() => setActiveImage(countNextIndexByOffset(-1))}>
          <FaArrowLeft />
        </SliderActionButton>
      )}
      <SliderImageItem src={images[activeImage]} alt="A" />
      {images.length > 1 && (
        <SliderActionButton onClick={() => setActiveImage(countNextIndexByOffset(-1))} style={{ right: 0 }}>
          <FaArrowRight />
        </SliderActionButton>
      )}
    </SliderWrapper>
  );
};

const SliderActionButton = styled(IconButton)`
  border: none;
  position: absolute;
  background: #000;
  color: #fff;
  top: 48%;
`;

const SliderWrapper = styled.div<{ size: number }>`
  min-width: ${(props) => props.size}px;
  min-height: ${(props) => props.size}px;
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const SliderImageItem = styled.img`
  width: inherit;
  height: inherit;
  object-fit: contain;
`;
