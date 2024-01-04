"use client";
import React, { ReactElement, RefObject, useState } from "react";
import ResultsList from "./results/page";
import axios from "axios";
import { IResult } from "@/utils/types";

interface InputData {
  label: string;
  ref: RefObject<HTMLInputElement>;
  key: string;
}

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState<IResult[]>([]);
  const [error, setError] = useState({} as Error);

  const inputs: InputData[] = [
    { label: "Query", ref: React.createRef<HTMLInputElement>(), key: "query" },
    {
      label: "Limitation",
      ref: React.createRef<HTMLInputElement>(),
      key: "limit",
    },
  ];

  const select = {
    label: "Sort type",
    ref: React.createRef<HTMLSelectElement>(),
    options: ["popular", "rate", "priceup", "pricedown", "newly", "benefit"],
  };

  const loadItems = (e: Event) => {
    setLoading((state) => !state);
    setResults([]);
    setError(null);
    e.preventDefault();

    const inputsObject: Record<string, string> = inputs.reduce((acc, el) => {
      acc[el.key] = el.ref.current?.value || "";
      return acc;
    }, {} as Record<string, string>);

    inputsObject.sort_type = select.ref.current!.value;

    const url = "http://127.0.0.1:8000/api";
    axios
      .post(url, inputsObject)
      .then((response) => {
        setResults(response.data);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading((state) => !state));
  };

  return (
    <main className="flex flex-col gap-4 p-4">
      <form className="flex flex-col gap-2 w-fit p-4">
        <h3>Query builder, please, fill the inputs</h3>
        {inputs.map((input) => (
          <label
            key={input.label}
            className="flex gap-1 justify-between w-full"
          >
            {input.label}
            <input type="search" ref={input.ref} className="p-1 text-black" />
          </label>
        ))}
        <select
          defaultValue={select.options[0]}
          className="text-black"
          ref={select.ref}
        >
          {select.options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <button
          type="submit"
          className={`${
            isLoading && "disabled"
          } border-2 border-cyan-400 w-fit p-2`}
          onClick={(e: any) => loadItems(e)}
          disabled={isLoading}
        >
          Submit
        </button>
      </form>
      {error?.message ? (
        <div className="text-red-500">{error.message} , try again.</div>
      ) : isLoading ? (
        <div className="flex justify-center w-full min-h-[400px]">
          <span className="loader "></span>
        </div>
      ) : (
        <ResultsList results={results} />
      )}
    </main>
  );
}
