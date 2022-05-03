import TailSpin from "react-loading-icons/dist/components/tail-spin";

const Loading = () => {
  return (
    <div className="grid w-full text-white remainingScreenHeight place-items-center">
      <TailSpin stroke="#1fd2ff" />
    </div>
  );
};

export default Loading;
