import { useContext } from "react";
import Navbar from "../navbar/Navbar";
import Songs from "../songs/Songs";
import Album from "./Album";
import { PlayerContext } from "../../context/PlayerContext";
import FooterFeed from "../footer/FooterFeed";

const HomeFeedArea = () => {
  const { songsData, albumsData } = useContext(PlayerContext);
  return (
    <>
      <Navbar />
      <section className="mb-4">
        <h1 className="text-2xl my-5 font-bold">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((album, index) => (
            <Album
              key={index}
              image={album.image}
              id={album._id}
              name={album.name}
              desc={album.description}
            />
          ))}
        </div>
      </section>
      <section className="mb-4">
        <h1 className="text-2xl my-5 font-bold">Today's Top Songs</h1>
        <div className="flex overflow-auto">
          {songsData.map((album, index) => (
            <Songs
              key={index}
              image={album.image}
              id={album._id}
              name={album.name}
              desc={album.description}
            />
          ))}
        </div>
      </section>
      <FooterFeed />
    </>
  );
};

export default HomeFeedArea;
