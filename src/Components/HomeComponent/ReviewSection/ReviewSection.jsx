/* eslint-disable react/no-unescaped-entities */
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";
import { BsStarFill } from "react-icons/bs";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { RiEyeCloseLine } from "react-icons/ri";
import { HiOutlineEye } from "react-icons/hi";
import { useState } from "react";

const accordionData = [
  {
    title: "What services does your business offer ?",
    content:
      "We create visually appealing and user-friendly websites and dashboards that effectively convey our clients' brand messages and enhance their online presence.",
  },
  {
    title: "Can you optimize websites for search engines ?",
    content:
      "We create visually appealing and user-friendly websites and dashboards that effectively convey our clients' brand messages and enhance their online presence.",
  },
  {
    title: "Why is a well-designed website important ?",
    content:
      "We create visually appealing and user-friendly websites and dashboards that effectively convey our clients' brand messages and enhance their online presence.",
  },
  {
    title: "What is your design process ?",
    content:
      "We create visually appealing and user-friendly websites and dashboards that effectively convey our clients' brand messages and enhance their online presence.",
  },
  {
    title: "Do you offer ongoing support ?",
    content:
      "We create visually appealing and user-friendly websites and dashboards that effectively convey our clients' brand messages and enhance their online presence.",
  },
  {
    title: "How can I get started ?",
    content:
      "We create visually appealing and user-friendly websites and dashboards that effectively convey our clients' brand messages and enhance their online presence.",
  },
];

const ReviewCard = () => {
  return (
    <div className="rounded-xl shadow p-8 bg-white">
      <div>
        <h1 className="text-[18px]">
          {" "}
          <span className="text-[#16A34A]">“</span> I can't express how grateful
          I am for this healthcare website. The information and resources
          provided have been a lifeline for me. From detailed articles on
          various medical conditions to finding the right healthcare providers
          in my area, this website has been an invaluable resource.{" "}
          <span className="text-[#16A34A]">”</span>
        </h1>

        <div className="mt-[30px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="./images/user.png" />
            <div>
              <h1 className="text-[18px] font-semibold">Jennifer O</h1>
              <p className="text-[#000609]">Product Designer</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[17px] ">
            <BsStarFill className="text-[#FBDB33]" />
            <BsStarFill className="text-[#FBDB33]" />
            <BsStarFill className="text-[#FBDB33]" />
            <BsStarFill className="text-[#FFF3B5]" />
            <BsStarFill className="text-[#FFF3B5]" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleAccordion = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <section className="bg-[#F4FAF6] px-6 py-[2rem] lg:py-[4rem] mt-[3rem]">
      <div className="max-w-[1300px] mx-auto">
        <div className="flex justify-between items-center gap-2 flex-col md:flex-row ">
          <div>
            <h2 className="text-[#16A34A] text-[18px] uppercase">
              You can have the best people. Right now. Right here.
            </h2>
            <h1 className="text-[50px] font-medium my-3">What Patients Say?</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-full cursor-pointer">
              <IoMdArrowRoundBack className="text-[#B7B7B7] text-[2.5rem]" />
            </div>
            <div className="bg-white p-2 rounded-full cursor-pointer">
              {" "}
              <IoMdArrowRoundForward className="text-[#22C55E] text-[2.5rem]" />{" "}
            </div>
          </div>
        </div>

        <div className="my-[30px] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center gap-[2rem]">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>

        <div className="py-4">
          <h1 className="text-[50px] text-center font-semibold">FAQs</h1>

          <div className="my-6">
            <Accordion
              defaultIndex={[0]}
              allowMultiple
              className="p-2 my-4 flex flex-col gap-4"
            >
              {accordionData.map((item, index) => (
                <AccordionItem
                  key={index}
                  border={0}
                  bg={"white"}
                  className="rounded-[40px] p-4"
                  isExpanded={expandedIndex === index}
                >
                  <h2>
                    <AccordionButton
                      onClick={() => toggleAccordion(index)}
                      _hover={{ bg: "none", color: "inherit" }}
                      className="hover:cursor-pointer"
                    >
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        className="text-[1.3rem] lg:text-[1.6rem]"
                      >
                        {item.title}
                      </Box>
                      {expandedIndex === index ? (
                        <HiOutlineEye className="text-[30px]" />
                      ) : (
                        <RiEyeCloseLine className="text-[30px]" />
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} className="text-[1rem] lg:text-[1.2rem]">
                    {item.content}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
