import React from "react";

export const useFilterItems = (showItem, items) => {
  const filtered = React.useMemo(() => {
    const filteredItems = showItem ? items.filter((i) => i.isActive) : items;
    return filteredItems;
  }, [items, showItem]);

  return filtered;
};
