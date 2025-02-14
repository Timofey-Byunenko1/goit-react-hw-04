import { Toaster, toast } from "react-hot-toast";
import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import { useEffect, useState } from "react";
import fetchPictures from "../services/api";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal"; // Переносимо модалку сюди

const App = () => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      setLoading(true);
      setIsError(false);

      try {
        const data = await fetchPictures(query, page);
        if (data.length === 0) {
          toast.error("No images found for this request! 😕", {
            style: {
              background: "#b1cc29",
              color: "#fff",
              fontWeight: "bold",
              padding: "12px",
              borderRadius: "10px",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#d32f2f",
            },
            position: "top-left",
          });
        }
        setHits((prev) => [...prev, ...data]);
      } catch (error) {
        console.error(error);
        setIsError(true);
        toast.error(
          "There was an error loading images, please try again later😢",
          {
            style: {
              background: "red",
              color: "#fff",
              fontWeight: "bold",
              padding: "12px",
              borderRadius: "10px",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#d32f2f",
            },
            position: "top-left",
          }
        );
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleClick = () => {
    setPage((prev) => prev + 1);
  };

  const handleSetQuery = (newQuery) => {
    setQuery(newQuery);
    setHits([]);
    setPage(1);
  };

  // Функції для модального вікна
  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage("");
  };

  return (
    <>
      <Toaster />
      <SearchBar request={handleSetQuery} />

      {!isError ? (
        <ImageGallery hitsArrey={hits} onImageClick={openModal} />
      ) : (
        <ErrorMessage />
      )}

      <Loader loading={isLoading} />

      {hits.length > 0 && !isLoading && !isError && (
        <LoadMoreBtn handleClick={handleClick} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        imageUrl={selectedImage}
        onRequestClose={closeModal}
      />
    </>
  );
};

export default App;
