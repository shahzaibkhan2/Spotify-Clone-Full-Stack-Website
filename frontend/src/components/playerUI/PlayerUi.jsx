import { useContext } from "react";
import { assets } from "../../assets/assets";
import { PlayerContext } from "../../context/PlayerContext";
import { IoMdPlay } from "react-icons/io";
import { MdOutlinePause } from "react-icons/md";

const PlayerUi = () => {
  const {
    seekBgRef,
    seekBarRef,
    track,
    playStatus,
    time,
    playSong,
    pauseSong,
    nextSong,
    prevSong,
    traceSeekSong,
  } = useContext(PlayerContext);
  return track ? (
    <div className="h-[10%] flex bg-black justify-between text-white px-4 items-center">
      <section className="hidden lg:flex gap-4 items-center">
        <img className="w-12" src={track.image} alt="song-image" />
        <div>
          <p>{track.name}</p>
          <p>{track.description.slice(0, 12)}</p>
        </div>
      </section>
      <section className="flex items-center flex-col m-auto gap-1 mb-4">
        <div className="flex gap-4">
          <img
            className="cursor-pointer h-4 w-4 mt-2"
            src={assets.shuffle_icon}
            alt="shuffle"
          />
          <img
            onClick={prevSong}
            className="cursor-pointer h-4 w-4 mt-2"
            src={assets.prev_icon}
            alt="previous"
          />
          {playStatus ? (
            <div className="flex justify-between items-center w-8 h-8 rounded-full bg-white">
              <MdOutlinePause
                onClick={pauseSong}
                className="text-black cursor-pointer ml-[4px] h-[22px] w-[22px]"
              />
            </div>
          ) : (
            <div className="flex justify-between items-center w-8 h-8 rounded-full bg-white">
              <IoMdPlay
                onClick={playSong}
                className="text-black cursor-pointer ml-[7px] h-5 w-5"
              />
            </div>
          )}
          <img
            onClick={nextSong}
            className="cursor-pointer h-4 w-4 mt-2"
            src={assets.next_icon}
            alt="next"
          />
          <img
            className="cursor-pointer h-4 w-4 mt-2"
            src={assets.loop_icon}
            alt="loop"
          />
        </div>
        <div className="flex gap-5 items-center">
          <p>
            {time.currentTime.minute} : {time.currentTime.second}
          </p>
          <div
            onClick={traceSeekSong}
            ref={seekBgRef}
            className="max-w-[500px] w-[60vw] cursor-pointer rounded-full bg-gray-300"
          >
            <hr
              ref={seekBarRef}
              className="border-none h-1 rounded-full bg-[#f95d70] w-0"
            />
          </div>
          <p>
            {time.totalTime.minute} : {time.totalTime.second}
          </p>
        </div>
      </section>
      <section className="hidden lg:flex gap-2 opacity-75 items-center">
        <img className="w-4" src={assets.plays_icon} alt="play" />
        <img className="w-4" src={assets.mic_icon} alt="mic" />
        <img className="w-4" src={assets.queue_icon} alt="queue" />
        <img className="w-4" src={assets.speaker_icon} alt="speaker" />
        <img className="w-4" src={assets.volume_icon} alt="volume" />
        <div className="bg-slate-50 w-20 rounded h-1"></div>
        <img className="w-4" src={assets.mini_player_icon} alt="mini-player" />
        <img className="w-4" src={assets.zoom_icon} alt="zoom" />
      </section>
    </div>
  ) : null;
};

export default PlayerUi;
