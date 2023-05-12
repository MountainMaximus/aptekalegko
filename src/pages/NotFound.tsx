import React from "react";
import { Link } from "react-router-dom";

export const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Страница не найдена</h1>
      <Link to="/" className="btn">
        Вернуться на главную
      </Link>
    </div>
  );
};
