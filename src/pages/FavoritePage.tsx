import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../components";
import { IPost } from "../type";
export const FavoritePage: React.FC = () => {
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const [favoriteList, setFavoriteList] = React.useState<number[]>(
    JSON.parse(window.localStorage.getItem("favoriteList") || "[]")
  );

  React.useEffect(() => {
    const allPosts = favoriteList.map((id) =>
      axios.get<IPost>(`${process.env.REACT_APP_API_URL}posts/${id}`)
    );
    Promise.all(allPosts)
      .then(function (values) {
        setPosts(values.map((val) => val.data));
      })
      .catch((err) => console.log(err));
  }, [favoriteList]);

  const updateFavoriteList = React.useCallback((id: number) => {
    let list = JSON.parse(window.localStorage.getItem("favoriteList") || "[]");
    if (Array.isArray(list) && list.includes(id)) {
      list = list.filter((val) => val !== id);
    }
    window.localStorage.setItem("favoriteList", JSON.stringify(list));
    setFavoriteList(list);
  }, []);
  return (
    <>
      <h1>Страница избранного</h1>
      <div className="post">
        {posts?.length > 0 ? (
          posts.map((obj) => (
            <Post
              key={obj.id}
              {...obj}
              favoriteList={favoriteList}
              updateFavoriteList={updateFavoriteList}
            />
          ))
        ) : (
          <div style={{ textAlign: "center" }}>
            <h3>Тут пока-что пусто</h3>
            <Link to="/" className="btn">
              Вернуться на главную
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
