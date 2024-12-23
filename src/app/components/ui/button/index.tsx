import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

interface SVButtonProps extends ButtonProps {
  gradient?: string;
  borderColor?: string;
  boxShadowStyle?: string;
  isLoading?: boolean;
}

const SVButton: React.FC<SVButtonProps> = ({
  gradient = "linear(180deg, #866BCC -45.16%, #4A22B3 148.39%)",
  borderColor = "#431FA3",
  boxShadowStyle = `0px 4px 16px 0px rgba(0, 0, 0, 0.06), 
                    0px -0.5px 2px 0px rgba(0, 0, 0, 0.06), 
                    -1px -4px 6px 0px #431FA3 inset, 
                    0px 2px 3px 0px #AC99DC inset, 
                    -1px -1px 2px 0px rgba(223, 223, 223, 0.16) inset`,
  isLoading,
  children,
  ...props
}) => {
  return (
    <Button
      borderRadius="8px"
      border={`0.8px solid ${borderColor}`}
      bgGradient={gradient}
      boxShadow={boxShadowStyle}
      disabled={isLoading}
      isLoading={isLoading}
      color="white"
      _hover={{
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.12)",
        transform: "scale(1.01)",
      }}
      _active={{
        boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.2)",
        transform: "scale(0.98)",
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SVButton;
