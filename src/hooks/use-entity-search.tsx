import { useEffect, useState } from "react";
import { PAGINATION } from "@/config/constants";

type UseEntitySearchProps<T extends { search: string; page: number }> = {
  params: T;
  setParams: (value: T) => void;
  debounceMs?: number;
};

export function useEntitySearch<T extends { search: string; page: number }>({
  params,
  setParams,
  debounceMs = 300,
}: UseEntitySearchProps<T>) {
  const [localSearch, setLocalSearch] = useState(params.search);
  useEffect(() => {
    if (localSearch === "" && params.search !== "") {
      setParams({
        ...params,
        search: localSearch,
        page: PAGINATION.DEFAULT_PAGE,
      });
    }
    const timer = setTimeout(() => {
      if (localSearch !== params.search) {
        setParams({
          ...params,
          search: localSearch,
          page: PAGINATION.DEFAULT_PAGE,
        });
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [debounceMs, localSearch, params, setParams]);

  useEffect(() => {
    setLocalSearch(params.search);
  }, [params.search]);

  return {
    searchValue: localSearch,
    onSearchChange: setLocalSearch,
  };
}
