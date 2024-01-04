import { IResult } from "@/utils/types";

export default function AllResultsInfo(result: IResult) {
  return <div className="text-white">{result.title}</div>;
}
