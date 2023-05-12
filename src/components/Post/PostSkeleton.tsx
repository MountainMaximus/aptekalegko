import React from "react";
export const PostSkeleton: React.FC = () => {
  return (
    <div className="skeleton__wrapper">
      <div className="skeleton__block skeleton__block-sm">Блок</div>
      <div className="skeleton__block">Блок</div>
    </div>
  );
};
