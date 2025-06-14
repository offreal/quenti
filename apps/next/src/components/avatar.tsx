import Image from "next/image";
import React from "react";

import { type AvatarProps, Avatar as ChakraAvatar } from "@chakra-ui/react";

interface OptimizedAvatarProps extends Omit<AvatarProps, "src"> {
  src?: string | null;
  alt?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export const Avatar: React.FC<OptimizedAvatarProps> = ({
  src,
  alt = "Avatar",
  imageWidth,
  imageHeight,
  size = "md",
  ...avatarProps
}) => {
  // Calculate image dimensions based on Avatar size if not provided
  const getImageSize = () => {
    if (imageWidth && imageHeight) {
      return { width: imageWidth, height: imageHeight };
    }

    // Default sizes based on Chakra UI Avatar sizes
    const sizeMap: Record<string, number> = {
      "2xs": 16,
      xs: 24,
      sm: 32,
      md: 48,
      lg: 64,
      xl: 96,
      "2xl": 128,
    };

    const dimension = typeof size === "string" ? sizeMap[size] || 48 : 48;
    return { width: dimension, height: dimension };
  };

  const { width, height } = getImageSize();

  return (
    <ChakraAvatar
      bg="gray.200"
      _dark={{
        bg: "gray.700",
      }}
      icon={<></>}
      size={size}
      {...avatarProps}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      )}
    </ChakraAvatar>
  );
};
