import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../../Layouts/HomeLayout";
import ActiveJobDetailsComponent from "../../../Components/MyJobsComponentUi/ActiveJobDetailsComponent";

const ActiveJobDetails = () => {
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  return (
    <>
      <HomeLayout>
        {role == 1 ? <ActiveJobDetailsComponent /> : navigate("/find-job")}
      </HomeLayout>
    </>
  );
};

export default ActiveJobDetails;
