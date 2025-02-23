// import React from "react";
import { Avatar, Tag } from "antd";
import { Link } from "react-router-dom";
// import { PATH } from "../../config";

interface TagWithShowMoreProps {
  maxCount: number; // Number of items to show initially
  list: any[]; // Array of items (tags)
  isLinkAble?: boolean; // Flag to check if the tags should be links
  keyName?: string; // Key name for generating links (optional)
}

const TagWithShowMore = ({ maxCount, list, isLinkAble = false, keyName }: TagWithShowMoreProps) => {
    console.log("keyName",keyName);
  // Render linkable tags if `isLinkAble` is true
  if (isLinkAble) {
    return (
      <Avatar.Group maxCount={maxCount} shape="square" className="show-more">
        {list?.map((tag, index) => (
          <Link
            key={index}
            to={
              "#"
            }
          >
            <Tag bordered={false} className="!m-0 underline text-[#2e3790] ">
              {tag?.sinNumber || tag?.mirNumber}
            </Tag>
          </Link>
        ))}
      </Avatar.Group>
    );
  }

  // Render plain tags if `isLinkAble` is false
  return (
<Avatar.Group maxCount={maxCount} shape="square" className="show-more ">
  {list?.map((tag, index) => (
    <Tag key={index} bordered={false} className="!m-0 pr-6  flex items-center justify-center counter-css">
      {tag}
    </Tag>
  ))}
</Avatar.Group>

  );
};

export default TagWithShowMore;
