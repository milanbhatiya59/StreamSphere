"use client";

import qs from "query-string";
import { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Search() {
  const router = useRouter();

  const [value, setValue] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) {
      return;
    }

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { search_query: value },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full md:w-[400px] flex items-center bg-neutral-800 p-[1px] rounded-full transition"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className="rounded-r-none rounded-full focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {value && (
        <X
          className="absolute top-4.1 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
          onClick={onClear}
        />
      )}
      <Button
        typeof="submit"
        size="sm"
        variant="ghost"
        className="rounded-l-none"
      >
        <SearchIcon className="h-10 w-10 text-muted-foreground" />
      </Button>
    </form>
  );
}
