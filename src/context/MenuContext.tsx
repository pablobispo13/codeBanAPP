import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type MenuType = "singup";

interface MenuContextType {
  value: MenuType;
  setValue: Dispatch<SetStateAction<MenuType>>;
}

export const MenuContext = createContext<MenuContextType | undefined>(
  undefined
);

export const MenuContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [value, setValue] = useState<MenuType>("singup");

  return (
    <MenuContext.Provider value={{ value, setValue }}>
      {children}
    </MenuContext.Provider>
  );
};
