import { Avatar, TableProps } from "antd";
import GenericTable from "../../../../components/UI/GenericTable";
import Typography from "../../../../components/UI/Typography";
import IMAGES from "../../../../assets/images";
import GenericCard from "../../../../components/UI/GenericCard";

const PurchaseHistory = () => {
    const data: any[] = [
        { key: "1", name: "Course 1", price: "100" },
        { key: "2", name: "Course 2", price: "200" },
        { key: "3", name: "Course 3", price: "300" },
        { key: "4", name: "Course 4", price: "400" },
        { key: "5", name: "Course 5", price: "500" },
    ];

    const columns: TableProps<any>["columns"] = [
        {
            title: "Course Name",
            dataIndex: "name", 
            key: "name",
            render: (name) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Avatar shape="circle" size="large" src={IMAGES.SAMPLE_WEB} />
                    {name} 
                </div>
            ),
            width: 100,
        },
        {
            title: "Price",
            dataIndex: "price", 
            className: "text-[#8970D6]",    
            key: "price",
            width: 100,
        },
    ];

    return (
        <>
        <GenericCard noMargin={true}>
            <div className="flex justify-between mt-3 mb-5">
                <Typography variant="headingFour" className="">
                    Purchase History
                </Typography>
            </div>

            <GenericTable columns={columns} data={data} />
            </GenericCard>
        </>
    );
};

export default PurchaseHistory;
