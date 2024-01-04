import { IResult } from "@/utils/types";
import { ResultCard } from "./result/resulstCard";

export default function ResultsList({ results }: { results: IResult[] }) {
  return (
    <div className="flex gap-2 flex-wrap max-w-full p-4 justify-around h-[70vh] overflow-auto">
      {results.map((result) => (
        <ResultCard result={result} key={result.id} />
      ))}
    </div>
  );
}
