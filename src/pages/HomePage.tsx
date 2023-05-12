import axios from "axios";
import React from "react";
import { Search, Post } from "../components";
import { IPost } from "../type";
export const HomePage: React.FC = () => {
  const [posts, setPosts] = React.useState<IPost[] | null>(null);
  const [favoriteList, setFavoriteList] = React.useState<number[]>(
    JSON.parse(window.localStorage.getItem("favoriteList") || "[]")
  );
  const [search, setSearch] = React.useState<string>("");

  React.useEffect(() => {
    axios
      .get<IPost[]>(`${process.env.REACT_APP_API_URL}/posts?q=${search}`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, [search]);

  const updateFavoriteList = React.useCallback((id: number) => {
    let list = JSON.parse(window.localStorage.getItem("favoriteList") || "[]");
    if (Array.isArray(list)) {
      if (list.includes(id)) list = list.filter((val) => val !== id);
      else list.push(id);
    } else list = [id];
    window.localStorage.setItem("favoriteList", JSON.stringify(list));
    setFavoriteList(list);
  }, []);
  return (
    <>
      <h1>Страница всех постов</h1>
      <Search setSearch={setSearch} />
      <div className="post">
        {posts &&
          posts.map((obj) => (
            <Post
              key={obj.id}
              {...obj}
              favoriteList={favoriteList}
              updateFavoriteList={updateFavoriteList}
            />
          ))}
      </div>
    </>
  );
};
