import HomeLayout from "../../../Layouts/HomeLayout";
import { UpdateWithStepper } from "../Gigsteper";

const GigEdit = () => {
  return (
    <HomeLayout>
      <div className="w-full border rounded-md p-5">
        <UpdateWithStepper />
      </div>
    </HomeLayout>
  );
};

export default GigEdit;
