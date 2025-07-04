import { ReactElement } from "react";
import GenericTabs, { Tab } from "../../../components/UI/GenericTabs";
import StudentCourses from "./AllCourses";
import Recommendations from "./InterestedCourses";

const Index = (): ReactElement => {
  const tabs: Tab[] = [
    {
      name: "All Courses",
      content: <StudentCourses />,
    },
    {
      name: "Recommendations",
      content: <Recommendations />,
    },
  ];

  return (
    <div>
      <GenericTabs tabs={tabs} />
    </div>
  );
};

export default Index;
