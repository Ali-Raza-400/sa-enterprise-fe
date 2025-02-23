import { Col } from "antd";
import { List } from "antd";
import Typography from "../../../../components/UI/Typography";

const StartStudent = () => {
  interface StarStudent {
    name: string;
    class: string;
    position: number;
    image: string; // URL of the student's image
  }

  // Example star students data
  const starStudents: StarStudent[] = [
    {
      name: "John Doe",
      class: "5A",
      position: 1,
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Jane Smith",
      class: "5B",
      position: 2,
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Alice Johnson",
      class: "5A",
      position: 3,
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Bob Brown",
      class: "5C",
      position: 4,
      image: "https://via.placeholder.com/50",
    },
  ];

  return (
    <Col span={24} sm={12} md={12} lg={12}>
      <div className="bg-white shadow-md rounded-lg p-6">
        <Typography variant="headingThreeLight" className="text-[#2F3237]">
          Star Students
        </Typography>
        <List
          itemLayout="horizontal"
          dataSource={starStudents}
          className="overflow-y-auto min-h-80 max-h-80" // Allow vertical scrolling
          renderItem={(student: StarStudent) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <img
                    src={student.image}
                    alt={student.name}
                    className="rounded-full w-12 h-12 object-cover" // Avatar styling
                  />
                }
                title={<span className="font-medium">{student.name}</span>}
                description={
                  <span className="text-gray-600">
                    Class: {student.class}, Position: {student.position}
                  </span>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </Col>
  );
};

export default StartStudent;
