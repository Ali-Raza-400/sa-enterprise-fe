import Card from "./Card"

const AllTab = () => {
      const videoData = [
    {
      id: 1,
      title: "Web Development",
      deadline: "15-9-1024",
      number: "1",
    },
    {
      id: 2,
      title: "Data Science",
      deadline: "17-9-1024",
      number: "2",
    },
    {
      id: 3,
      title: "Machine Learning",
      deadline: "19-9-1024",
      number: "3",
    },
    {
        id: 4,
        title: "Machine Learning",
        deadline: "19-9-1024",
        number: "4",
      },
  ];

  return (
    <>
      {videoData.map((item) => (

      <Card
        deadline={item.deadline}
        number={item.number}
        title={item.title}
        className="mt-5"
      />
  ))}
    </>
  )
}

export default AllTab
