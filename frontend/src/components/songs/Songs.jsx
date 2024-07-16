import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { IoMdPlay } from "react-icons/io";

const Songs = ({ image, name, id, desc }) => {
  const { playSongWithId } = useContext(PlayerContext);

  return (
    <article
      onClick={() => playSongWithId(id)}
      className="group min-w-[180px] px-3 p-2 cursor-pointer hover:bg-[#ffffff26] rounded"
    >
      <div className="relative">
        <img className="rounded w-full h-full" src={image} alt="album-image" />
        <div className="w-12 h-12 group-hover:opacity-100 flex justify-center items-center rounded-full p-2 bg-[#5ef550] absolute bottom-0 right-3 opacity-0 group-hover:bottom-3 transition-all ease-in-out duration-300">
          <IoMdPlay className="text-black" size={24} />
        </div>
      </div>
      <p className="font-bold mb-1 mt-2">{name}</p>
      <p className="text-sm text-slate-200">{desc}</p>
    </article>
  );
};

export default Songs;
