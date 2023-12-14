import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../../Layouts/HomeLayout";
import ActiveJobDetailsComponent from "../../../Components/MyJobsComponentUi/ActiveJobDetailsComponent";

const EndContract = () => {
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  return (
    <>
      <HomeLayout>
        {<ActiveJobDetailsComponent />}
      </HomeLayout>
    </>
  );
};

export default EndContract;
