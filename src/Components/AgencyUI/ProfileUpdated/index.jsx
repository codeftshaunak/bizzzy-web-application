import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { updateAgencyProfile } from "../../../helpers/freelancerApis";

export function AgencyUpdatedModal({ isModal, setIsModal, title, data }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = updateAgencyProfile(data);
      console.log({ response });
      setIsModal(false);
    } catch (error) {
      console.log(error);
      setIsModal(false);
    }
    console.log("modal", data);
  };
  return (
    <div>
      {isModal && (
        <div className="fixed top-0 left-0 flex justify-center items-center z-50 w-full h-full bg-black/30">
          <div className="w-[500px] bg-white border rounded-md relative p-5">
            <span
              className="h-7 w-7 bg-red-100/20 rounded-full absolute top-0 right-0 flex items-center justify-center cursor-pointer backdrop-blur backdrop-filter hover:bg-red-100 hover:text-red-500"
              onClick={() => {
                setIsModal(false);
              }}
            >
              <IoMdClose className="text-2xl" />
            </span>
            <h4 className="text-xl font-semibold capitalize">Update {title}</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-5">
                {/* update agency name */}
                {title === "Agency Name" && (
                  <input
                    type="text"
                    {...register("agency_name")}
                    defaultValue={data}
                    className="px-3 py-1 border rounded w-full"
                  />
                )}
                {/* update agency tagline */}
                {title === "Agency Tagline" && (
                  <input
                    type="text"
                    {...register("agency_tagline")}
                    defaultValue={data}
                    className="px-3 py-1 border rounded w-full"
                  />
                )}
                {/* update overview */}
                {title === "Overview" && (
                  <input
                    type="text"
                    {...register("agency_overview")}
                    defaultValue={data}
                    className="px-3 py-1 border rounded w-full"
                  />
                )}
                {/* update services */}
                {title === "Services" && (
                  <select className="px-3 py-1 border rounded w-full">
                    <option value="One">One</option>
                    <option value="Two">Two</option>
                    <option value="Three">Three</option>
                  </select>
                )}
                {/* update skills */}
                {title === "Skills" && (
                  <select className="px-3 py-1 border rounded w-full">
                    <option value="One">One</option>
                    <option value="Two">Two</option>
                    <option value="Three">Three</option>
                  </select>
                )}
              </div>

              <div className="text-right mt-10">
                <input
                  type="submit"
                  className="w-fit h-fit bg-green-600 hover:bg-green-500 rounded px-10 py-1 text-white font-semibold transition cursor-pointer"
                  value={"Submit"}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
