import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { apiUri } from "../constants";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  //<----------------------- States --------------------------->

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  // <----Authentication States---->
  const [isFixed, setIsFixed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [currentState, setCurrentState] = useState(false);

  // <------------------------------ useRef References ------------------------>

  const audioRef = useRef(null);
  const seekBgRef = useRef(null);
  const seekBarRef = useRef(null);
  const feedRef = useRef(null);

  //   <------------------------ Methods & Functions ----------------------->

  const playSong = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playSongWithId = async (id) => {
    await songsData.map((song) => {
      if (song._id === id) {
        setTrack(song);
      }
    });
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const nextSong = async () => {
    songsData.map(async (song, index) => {
      if (track._id === song._id && index < songsData.length - 1) {
        await setTrack(songsData[index + 1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    });
  };

  const prevSong = async () => {
    songsData.map(async (song, index) => {
      if (track._id === song._id && index > 0) {
        await setTrack(songsData[index - 1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    });
  };

  const traceSeekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBgRef.current.offsetWidth) *
      audioRef.current.duration;
  };

  const fetchSongsData = async () => {
    try {
      const response = await axios.get(
        `${apiUri.baseUri}/${apiUri.songUri}/list-song`
      );

      if (response.data.success) {
        setSongsData(response.data.data);
        setTrack(response.data.data[0]);
      }
    } catch (error) {
      console.log("Error while fetching songs", error);
    }
  };

  const fetchAlbumsData = async () => {
    try {
      const response = await axios.get(
        `${apiUri.baseUri}/${apiUri.albumUri}/list-album`
      );

      if (response.data.success) {
        setAlbumsData(response.data.data);
      }
    } catch (error) {
      console.log("Error while fetching albums", error);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  // <------------------- Page Rendering Methods and Hooks -------------------->

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBarRef.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    }, 1000);
  }, [audioRef]);

  useEffect(() => {
    fetchSongsData();
    fetchAlbumsData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //   <------------------------ Context Values -------------------------->

  const contextValue = {
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    playSong,
    pauseSong,
    playSongWithId,
    audioRef,
    seekBgRef,
    seekBarRef,
    feedRef,
    nextSong,
    prevSong,
    traceSeekSong,
    songsData,
    albumsData,
    isFixed,
    isLoggedIn,
    currentState,
    accessToken,
  };

  //   <------------------------ Provider Wrapper ------------------------->

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
