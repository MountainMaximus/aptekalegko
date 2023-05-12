import React from "react";
import { IPost } from "../../type";
import { truncateString } from "../../utils/truncateString";
import { Modal } from "../Modal";
import { FavoriteIcon } from "./FavoriteIcon";

export const Post: React.FC<
  IPost & { favoriteList: number[]; updateFavoriteList: (id: number) => void }
> = ({ id, title, body, favoriteList, updateFavoriteList }) => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div className="post__wrapper" onClick={() => setShowModal(true)}>
        <div className="post__content">
          <h4 className="post__content__title">{title}</h4>
          <div className="post__content__text">{truncateString(body)}</div>
        </div>
        <div className="post__menu">
          <FavoriteIcon
            opacity={favoriteList.includes(id)}
            onClick={() => updateFavoriteList(id)}
          />
        </div>
      </div>
      {showModal && (
        <Modal onClickClose={() => setShowModal(false)}>
          <h4 className="post__content__title">{title}</h4>
          <div className="post__content__text">{body}</div>
        </Modal>
      )}
    </>
  );
};
