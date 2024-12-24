import React, { memo, } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { savedMovies } from "../../redux/slices/Saved";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const MovieItem = ({ title, poster_path, vote_average, id, bg, data }) => {
  const navigate = useNavigate();
  const movies = useSelector((state) => state.saved.value);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSave = (product) => {
    const isSaved = movies.some((movie) => movie.id === product.id);
    if (isSaved) {
      const updatedMovies = movies.filter((movie) => movie.id !== product.id);
      dispatch(savedMovies(updatedMovies));
    } else {
      const updatedMovies = [...movies, product];
      dispatch(savedMovies(updatedMovies));
    }
  };

  return (
    <div
      className={`rounded-lg relative overflow-hidden shadow-lg  p-4 flex flex-col items-center ${
        bg ? "dark:bg-black" : ""
      }`}
    >
      <button
        onClick={() => handleSave(data)}
        className="absolute top-7 right-7 text-2xl font-bold"
      >
        {movies.some((movie) => movie.id === data.id) ? (
          <div className="active:w-12 active:h-12 active:duration-900 w-11 h-11 bg-slate-900 rounded-full grid place-items-center">
            <FaBookmark className="text-red-500 " />
          </div>
        ) : (
          <div className="active:w-12 active:h-12 active:duration-900 w-11 h-11 bg-slate-900 rounded-full grid place-items-center">
            <FaRegBookmark className="text-red-500" />
          </div>
        )}
      </button>
      <img
        onClick={() => navigate(`/product/${id}`)}
        src={`${import.meta.env.VITE_IMAGE_URL}${poster_path}`}
        alt={title}
        className="w-full h-[400px] object-cover rounded-md mb-4"
      />
      <h2
        title={title}
        className={`font-medium text-[20px] text-red-500 text-center mb-2 line-clamp-1 ${
          bg && "dark:text-white"
        }`}
      >
        {title}
      </h2>
      <p className="text-gray-500 text-md font-bold ">
        ⭐ {vote_average !== undefined ? Number(vote_average).toFixed(1) : "N/A"}
      </p>
    </div>
  );
};

export default memo(MovieItem);
