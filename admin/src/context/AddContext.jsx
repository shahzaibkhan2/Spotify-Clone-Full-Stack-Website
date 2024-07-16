import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { apiUri } from "../constants";
import { toast } from "react-toastify";

export const AddContext = createContext();

const AddContextProvider = ({ children }) => {
  // <------------------------ States ---------------------->

  // Song States
  const [listSong, setListSong] = useState([]);
  const [song, setSong] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Album States
  const [albumImage, setAlbumImage] = useState(null);
  const [listAlbum, setListAlbum] = useState([]);

  // <------------------------ useRef References -------------------------->

  // Song References
  const songRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();
  const nameRef = useRef();
  const albumRef = useRef();

  // Album References
  const albumImageRef = useRef();
  const albumNameRef = useRef();
  const albumDescriptionRef = useRef();
  const albumBgColorRef = useRef();

  // <---------------------- Methods and Functions ------------------------->

  const fetchListSong = async () => {
    try {
      const response = await axios.get(
        `${apiUri.baseUri}/${apiUri.songUri}/list-song`
      );

      if (response.data.success) {
        setListSong(response.data.data);
      } else {
        console.log("Some error while receiving response.");
      }
    } catch (error) {
      toast.error("Error occured while sending request.");
      console.log(error);
    }
  };

  const fetchListAlbum = async () => {
    try {
      const response = await axios.get(
        `${apiUri.baseUri}/${apiUri.albumUri}/list-album`
      );

      if (response.data.success) {
        setListAlbum(response.data.data);
      } else {
        console.log("Some error while receiving response.");
      }
    } catch (error) {
      toast.error("Error occured while sending request.");
      console.log(error);
    }
  };

  const deleteSong = async (id) => {
    try {
      const response = await axios.post(
        `${apiUri.baseUri}/${apiUri.songUri}/delete-song`,
        { id }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchListSong();
      }
    } catch (error) {
      toast.error("Error occured while deleting song.", error);
    }
  };

  const deleteAlbum = async (id) => {
    try {
      const response = await axios.post(
        `${apiUri.baseUri}/${apiUri.albumUri}/delete-album`,
        { id }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchListAlbum();
      }
    } catch (error) {
      toast.error("Error occured while deleting album.", error);
    }
  };

  const handleImageAudioUpload = (inputRef, type) => {
    const file = inputRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "image") {
          setImage(reader.result);
        } else if (type === "audio") {
          setSong(reader.result);
        } else if (type === "album-image") {
          setAlbumImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const albumOnSubmitHandler = async (e) => {
    e.preventDefault();
    let albumImageRefVal = albumImageRef.current.files[0];
    let albumDescriptionRefVal = albumDescriptionRef.current.value;
    let albumNameRefVal = albumNameRef.current.value;
    let albumBgColorRefVal = albumBgColorRef.current.value;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", albumNameRefVal);
      formData.append("description", albumDescriptionRefVal);
      formData.append("image", albumImageRefVal);
      formData.append("backgroundColor", albumBgColorRefVal);

      const response = await axios.post(
        `${apiUri.baseUri}/${apiUri.albumUri}/add-album`,
        formData
      );

      if (response.data.success) {
        toast.success("Album added successfully !");
        setAlbumImage("");
      } else {
        toast.error("Something went wrong while uploading album.");
      }
    } catch (error) {
      toast.error("Error occured");
      console.log("Something went wrong while uploading album.");
    }
    setIsLoading(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let songRefVal = songRef.current.files[0];
    let descriptionRefVal = descriptionRef.current.value;
    let imageRefVal = imageRef.current.files[0];
    let nameRefVal = nameRef.current.value;
    let albumRefVal = albumRef.current.value;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", nameRefVal);
      formData.append("description", descriptionRefVal);
      formData.append("image", imageRefVal);
      formData.append("audio", songRefVal);
      formData.append("album", albumRefVal);

      const response = await axios.post(
        `${apiUri.baseUri}/${apiUri.songUri}/add-song`,
        formData
      );
      console.log(response);

      if (response.status >= 200 && response.status < 300) {
        toast.success("Song added successfully !");
        setSong("");
        setImage("");
        await fetchListSong();
      } else {
        toast.error("Something went wrong while uploading song.");
      }
    } catch (error) {
      toast.error("Error occured");
      console.log(
        "Something went wrong while uploading song in catch block.",
        error
      );
    }
    setIsLoading(false);
  };

  // <--------------------- Rendering Methods (useEffect etc.) ----------------------->
  useEffect(() => {
    fetchListSong();
  }, []);

  useEffect(() => {
    fetchListAlbum();
  }, []);

  // <-------------------- Context Values ------------------->
  const addContextValues = {
    song,
    setSong,
    image,
    setImage,
    isLoading,
    setIsLoading,
    onSubmitHandler,
    songRef,
    imageRef,
    albumRef,
    descriptionRef,
    nameRef,
    handleImageAudioUpload,
    listSong,
    deleteSong,
    albumImageRef,
    albumDescriptionRef,
    albumBgColorRef,
    albumNameRef,
    albumImage,
    albumOnSubmitHandler,
    fetchListAlbum,
    listAlbum,
    deleteAlbum,
  };

  // <-------------------- Context Wrapper ------------------>

  return (
    <AddContext.Provider value={addContextValues}>
      {children}
    </AddContext.Provider>
  );
};

export default AddContextProvider;
