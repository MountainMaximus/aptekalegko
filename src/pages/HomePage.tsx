import axios from "axios";
import React from "react";
import { Search, Post } from "../components";
import { PostSkeleton } from "../components/Post/PostSkeleton";
import { IPost } from "../type";
export const HomePage: React.FC = () => {
  const [posts, setPosts] = React.useState<IPost[] | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [favoriteList, setFavoriteList] = React.useState<number[]>(
    JSON.parse(window.localStorage.getItem("favoriteList") || "[]")
  );
  const [search, setSearch] = React.useState<string>("");

  React.useEffect(() => {
    setLoading(true);
    axios
      .get<IPost[]>(`${process.env.REACT_APP_API_URL}/posts?q=${search}`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
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
        {loading &&
          [...new Array(3)].map((_, index) => <PostSkeleton key={index} />)}
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
