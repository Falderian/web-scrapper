import { IResult } from "@/utils/types";

export const ResultCard = ({ result }: { result: IResult }) => {
  return (
    <div className="flex flex-col border-2 border-cyan-300 w-1/3 p-2 hover:scale-105 hover:cursor-pointer transition-all">
      <span>{result.title}</span>
      <div className="grid grid-cols-2 w-full h-full items-center">
        <span>Rate: </span>
        <span>{result.rate}</span>
        <span>Price: </span>
        <span>{result.price}</span>
        <span className="min-w-full">Feedbacks count: </span>
        <span>{result.feedbacks_count}</span>
      </div>
    </div>
  );
};

const fullCardInfo = (result: IResult) => {
  const generalInfo = { ...result, feedbacks: null, metas: null };
  return (
    <div className="flex flex-col w-full h-full items-center text-black">
      {Object.keys(generalInfo).map((keyName, i) => (
        <div className="flex" key={keyName}>
          <span className="capitalize">{keyName}:</span>
          <span>{generalInfo[keyName as keyof IResult]}</span>
        </div>
      ))}
    </div>
  );
};
