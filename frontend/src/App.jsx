import React, { useContext } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import PlayerUi from "./components/playerUI/PlayerUi";
import FeedArea from "./components/feedArea/FeedArea";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);
  return (
    <main className="h-screen bg-black">
      {songsData.length !== 0 ? (
        <>
          <section className="h-[90%] flex">
            <Sidebar />
            <FeedArea />
          </section>
          <PlayerUi />
        </>
      ) : null}
      <audio
        src={track ? track.file : ""}
        ref={audioRef}
        preload="auto"
      ></audio>
    </main>
  );
};

export default App;
