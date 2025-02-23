import React from "react";
import { Card } from "antd";
import Typography from "../../../../components/UI/Typography";

interface GenericCardProps {
  imageSrc?: string;
  icon?: React.ReactNode;
  title?: string;
  views?: string;
  likes?: string;
  time?: string;
  onClick?: () => void;
  className?: string;
}

const GenericCard: React.FC<GenericCardProps> = ({
  imageSrc,
  icon,
  title,
  views,
  likes,
  time,
  onClick,
  className,
}) => {
  return (
    <Card
      hoverable
      className={`hover:border-[1px] hover:border-[#8970D6] ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-10">
        {imageSrc ? (
          <img src={imageSrc} className="w-20 h-20" alt={title} />
        ) : icon ? (
          <div className="text-5xl bg-[#EFEBF9] p-1">{icon}</div>
        ) : null}
        <div className="flex flex-col justify-center">
          <Typography variant="bodyLargeSemibold">{title}</Typography>
          {views && (
            <Typography variant="bodyMediumMedium">Views: {views}</Typography>
          )}
          {likes && (
            <Typography variant="bodyMediumMedium">Likes: {likes}</Typography>
          )}
          {time && <Typography variant="bodyMediumMedium">{time}</Typography>}
        </div>
      </div>
    </Card>
  );
};

export default GenericCard;
