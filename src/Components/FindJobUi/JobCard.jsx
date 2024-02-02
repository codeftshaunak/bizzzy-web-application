import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Text, HStack } from "@chakra-ui/react";
import AllJobCardSkeleton from "../LoadingComponent/AllJobCardSkeleton";

const JobCard = ({ jobs, searchTerm ,showHighlightedSearchTerm}) => {
  const navigate = useNavigate();

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const highlightSearchTerm = (text) => {
    if (!searchTerm || !showHighlightedSearchTerm) {
      return text;
    }

    const regex = new RegExp(searchTerm, "gi");
    return text.replace(regex, (match) => `<span class="bg-primary">${match}</span>`);
  };


  return (
    <>
      <div className="w-full">
        {jobs?.length > 0 ? (
          jobs?.map((job, index) => {
            const formattedDate = formatDistanceToNow(
              new Date(job?.created_at),
              {
                addSuffix: true,
              }
            );

            return (
              <div key={index}>
                <div className="p-8 border-b border-tertiary">
                  <div
                    className="text-gray-300 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: highlightSearchTerm(
                        `${(job?.job_type === "fixed" && " Fixed Budget ") ||
                        (job?.job_type === "hourly" && "Hourly")
                        } / ${job?.experience} / Est. Budget: $${job?.amount} / ${formattedDate}`
                      )
                    }}
                  />
                  <div
                    className="font-semibold mt-2 mb-2 cursor-pointer text-xl capitalize"
                    onClick={() => {
                      navigate(`/find-job/${job?._id}`);
                    }}
                    dangerouslySetInnerHTML={{
                      __html: highlightSearchTerm(job?.title)
                    }}
                  />
                  <div
                    className="space-y-0 text-gray-300"
                    dangerouslySetInnerHTML={{
                      __html: highlightSearchTerm(truncateText(job?.description, 500)),
                    }}
                  />

                  <div className="flex items-center ">
                    <div
                      className="star-filled"
                      style={{ color: "var(--primarycolor)" }}
                    >
                      ★
                    </div>
                    <div
                      className="star-filled"
                      style={{ color: "var(--primarycolor)" }}
                    >
                      ★
                    </div>
                    <div
                      className="star-filled"
                      style={{ color: "var(--primarycolor)" }}
                    >
                      ★
                    </div>
                    <div
                      className="star-filled"
                      style={{ color: "var(--primarycolor)" }}
                    >
                      ★
                    </div>
                    <div
                      className="star-filled"
                      style={{ color: "var(--primarycolor)" }}
                    >
                      ★
                    </div>
                    <div className="text-sm font-medium text-gray-400 pl-2">
                      5.0 300K+ Spent / United States
                    </div>
                  </div>

                  <div className="mt-2">
                    <b>Skills</b>
                    <HStack marginTop={"0.5rem"}>
                      {job?.skills.map((skill, indx) => (
                        <Text
                          key={indx}
                          textTransform={"capitalize"}
                          paddingX={"15px"}
                          mb={"0"}
                          pb={"2px"}
                          backgroundColor={"var(--bordersecondary)"}
                          color={"var(--primarytext)"}
                          borderRadius={"15px"}
                          dangerouslySetInnerHTML={{
                            __html: highlightSearchTerm(skill)
                          }}
                        />
                      ))}
                    </HStack>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <div className="text-center p-5">
              {[1, 2, 3, 4].map((item) => (
                <AllJobCardSkeleton key={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default JobCard;
 