export const HtcHd2HomeDock = () => {
  return (
    <div className="min-h-screen bg-black grid place-items-center">
      <div className="bg-pink-100 w-[414px] h-[686px] rounded relative overflow-hidden">
        <div className="absolute bottom-0 max-w bg-pink-300 flex">
          {Array.from(Array(10).keys()).map((v) => (
            <div key={v} className="border w-24 h-24"></div>
          ))}
        </div>
      </div>
    </div>
  );
};
