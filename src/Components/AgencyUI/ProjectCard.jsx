import { useState } from "react";
import { HStack, VStack, Box } from "@chakra-ui/react";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";

const ProjectCard = ({ info }) => {
  const { project_name } = info || {};
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="w-full p-3 border rounded-md">
      <div
        className="h-48 w-full bg-cover rounded-md relative transition duration-300 overflow-hidden"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img
          src="https://buffer.com/library/content/images/2023/10/free-images.jpg"
          alt=""
          className="h-48 w-full bg-cover rounded-md"
        />
        {isHover && (
          <Box
            transition={"0.6s ease-in-out"}
            className="h-48 w-full absolute top-0 left-0 bg-black/30 transition duration-300"
          >
            <HStack
              fontSize={"2.5rem"}
              position={"absolute"}
              transform={"translate(-50%, -50%)"}
              top={"50%"}
              left={"50%"}
            >
              <VStack
                backgroundColor={"white"}
                borderRadius={"50%"}
                width={"50px"}
                height={"50px"}
                alignItems={"center"}
                justifyContent={"center"}
                transition={"0.6s ease-in-out"}
                cursor={"pointer"}
                _hover={{
                  border: "2px solid var(--primarycolor)",
                  backgroundColor: "transparent",
                  color: "var(--primarycolor)",
                }}
              >
                <RiEdit2Fill fontSize={"25px"} />
              </VStack>
              <VStack
                backgroundColor={"white"}
                borderRadius={"50%"}
                width={"50px"}
                height={"50px"}
                alignItems={"center"}
                justifyContent={"center"}
                transition={"0.6s ease-in-out"}
                cursor={"pointer"}
                _hover={{
                  border: "2px solid var(--primarycolor)",
                  backgroundColor: "transparent",
                  color: "var(--primarycolor)",
                }}
              >
                <RiDeleteBin2Fill cursor={"pointer"} fontSize={"25px"} />
              </VStack>
            </HStack>
          </Box>
        )}
      </div>
      <h4 className="text-xl font-semibold capitalize text-gray-800 mt-1">
        {project_name}
      </h4>
    </div>
  );
};

export default ProjectCard;
