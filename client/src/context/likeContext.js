import { createContext, useState } from "react";

export const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likes, setLikes] = useState(null);

  return (
    <LikeContext.Provider value={{ likes, setLikes }}>
      {children}
    </LikeContext.Provider>
  );
};
