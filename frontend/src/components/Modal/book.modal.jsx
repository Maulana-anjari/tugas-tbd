import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
export const Modal = ({ closeModal, onSubmit, defaultValue, mode }) => {
  const [publishers, setPublishers] = useState([]);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [formState, setFormState] = useState({
    ISBN: "",
    TITLE: "",
    PUBLISHER_ID: "",
    PUBLICATION_YEAR: "",
    EDITION: "",
    AUTHOR_ID: "",
    LANGUAGE: "",
    PAGES: "",
    GENRE_ID: "",
    SYNOPSIS: "",
    CAPITAL_PRICE: "",
    SELLING_PRICE: "",
  });
  const [errors, setErrors] = useState("");
  useEffect(() => {
    if (defaultValue) {
      setFormState(defaultValue);
    }
  }, [defaultValue]);
  useEffect(() => {
    const adminApi = axios.create({
      baseURL: "http://localhost:3001",
    });
    adminApi.get("/books/publisher").then((res) => {
      const pubs = res.data.data.rows;
      // setPublishers(pubs.map(pub => (
      //   { value: pub.PUBLISHER_ID, label: pub.PUBLISHER_NAME }
      // )));
      setPublishers(pubs);
    });
    adminApi.get("/books/genre").then((res) => {
      setGenres(res.data.data.rows);
    });
    adminApi.get("/books/author").then((res) => {
      setAuthors(res.data.data.rows);
    });
  }, []);
  const validateForm = () => {
    const { ISBN, TITLE, PUBLISHER_ID, PUBLICATION_YEAR, EDITION, AUTHOR_ID, LANGUAGE, PAGES, GENRE_ID, SYNOPSIS, CAPITAL_PRICE, SELLING_PRICE } = formState;
    if (ISBN && TITLE && PUBLISHER_ID && PUBLICATION_YEAR && EDITION && AUTHOR_ID && GENRE_ID && LANGUAGE && PAGES && SYNOPSIS && CAPITAL_PRICE && SELLING_PRICE) {
      setErrors("");
      return true;
    } else {
      const errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    // if (e.target.name === "AUTHOR_ID") {
    //   setFormState((prevFormState) => ({
    //     ...prevFormState,
    //     AUTHOR_ID: [...prevFormState.AUTHOR_ID, e.target.value],
    //   }));
    // } else if (e.target.name === "GENRE_ID") {
    //   setFormState((prevFormState) => ({
    //     ...prevFormState,
    //     GENRE_ID: [...prevFormState.GENRE_ID, e.target.value],
    //   }));
    // } else {
    //   setFormState({ ...formState, [e.target.name]: e.target.value });
    // }
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    onSubmit(formState, mode);

    closeModal();
  };

  return (
    <div
      className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-40"
      onClick={(e) => {
        if (
          e.target.className ===
          "fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-40"
        )
          closeModal();
      }}
    >
      <div className="bg-white p-8 rounded-md w-1/2">
        <form className="flex flex-col">
          <div className="flex flex-row justify-center">
            <div className="p-2">
              <div className="flex flex-col mb-4">
                <label htmlFor="ISBN" className="font-semibold">
                  ISBN
                </label>
                {mode === "edit" ? (<input
                  name="ISBN"
                  type="number"
                  onChange={handleChange}
                  value={formState.ISBN}
                  readOnly
                  className="border border-black rounded-md p-1 text-base w-64"
                />) : (<input
                  name="ISBN"
                  type="number"
                  onChange={handleChange}
                  value={formState.ISBN}
                  className="border border-black rounded-md p-1 text-base w-64"
                />)}
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="TITLE" className="font-semibold">
                  TITLE
                </label>
                <input
                  name="TITLE"
                  onChange={handleChange}
                  value={formState.TITLE}
                  className="border border-black rounded-md p-1 text-base w-64"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="PUBLISHER_ID" className="font-semibold">
                  PUBLISHER
                </label>
                <select
                  name="PUBLISHER_ID"
                  onChange={handleChange}
                  value={formState.PUBLISHER_ID}
                  className="border border-black rounded-md p-1 text-base w-64"
                >
                  <option selected className="none"></option>
                  {publishers.map((pub, index) => (
                    <option value={pub?.PUBLISHER_ID} key={index}>{pub?.PUBLISHER_NAME}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="PUBLICATION_YEAR" className="font-semibold w-64">
                  PUBLICATION YEAR
                </label>
                <input
                  name="PUBLICATION_YEAR"
                  type="number"
                  onChange={handleChange}
                  value={formState.PUBLICATION_YEAR}
                  className="border border-black rounded-md p-1 text-base w-64"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="EDITION" className="font-semibold">
                  EDITION
                </label>
                <input
                  name="EDITION"
                  type="number"
                  onChange={handleChange}
                  value={formState.EDITION}
                  className="border border-black rounded-md p-1 text-base w-64"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="AUTHOR_ID" className="font-semibold">
                  AUTHOR
                </label>
                <select
                  name="AUTHOR_ID"
                  onChange={handleChange}
                  value={formState.AUTHOR_ID}
                  // multiple="multiple"
                  className="border border-black rounded-md p-1 text-base w-64"
                >
                  <option selected className="none"></option>
                  {authors.map((author, index) => (
                    <option value={author?.AUTHOR_ID} key={index}>{author?.AUTHOR_NAME}</option>
                  ))}
                </select>
                {/* <Select
                  defaultValue={[authors[1]]}
                  isMulti
                  name="AUTHOR_ID"
                  options={authors}
                  onChange={handleAuhtorChange}
                  className="border border-black rounded-md p-1 text-base w-64"
                  classNamePrefix="select"
                /> */}
              </div>
            </div>
            <div className="p-2">
              <div className="flex flex-col mb-4">
                <label htmlFor="LANGUAGE" className="font-semibold">
                  LANGUAGE
                </label>
                <input
                  name="LANGUAGE"
                  onChange={handleChange}
                  value={formState.LANGUAGE}
                  className="border border-black rounded-md p-1 text-base w-64"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="PAGES" className="font-semibold">
                  PAGES
                </label>
                <input
                  name="PAGES"
                  type="number"
                  onChange={handleChange}
                  value={formState.PAGES}
                  className="border border-black rounded-md p-1 text-base w-64v"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="GENRE_ID" className="font-semibold">
                  GENRE
                </label>
                <select
                  name="GENRE_ID"
                  onChange={handleChange}
                  value={formState.GENRE_ID}
                  // multiple="multiple"
                  className="border border-black rounded-md p-1 text-base w-64"
                >
                  <option selected className="none"></option>
                  {genres.map((genre, index) => (
                    <option value={genre?.GENRE_ID} key={index}>{genre?.GENRE}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="SYNOPSIS" className="font-semibold">
                  SYNOPSIS
                </label>
                <textarea
                  name="SYNOPSIS"
                  onChange={handleChange}
                  value={formState.SYNOPSIS}
                  className="border border-black rounded-md p-1 text-base w-64"
                ></textarea>
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="CAPITAL_PRICE" className="font-semibold">
                  CAPITAL PRICE
                </label>
                <input
                  name="CAPITAL_PRICE"
                  onChange={handleChange}
                  value={formState.CAPITAL_PRICE}
                  className="border border-black rounded-md p-1 text-base w-64"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="SELLING_PRICE" className="font-semibold">
                  SELLING PRICE
                </label>
                <input
                  name="SELLING_PRICE"
                  onChange={handleChange}
                  value={formState.SELLING_PRICE}
                  className="border border-black rounded-md p-1 text-base w-64"
                />
              </div>
            </div>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button
            type="submit"
            className="mt-4 border-none bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md"
            onClick={handleSubmit}
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
};
