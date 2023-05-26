import {
  MouseEventHandler,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";

interface DataContextInterface {
  name: string | null;
  handleNameChange: () => void;
}

export const DataContext = createContext<DataContextInterface>({
  name: null,
  handleNameChange: () => {},
});

interface Props {
  children: ReactNode;
}

const DataProvider = ({ children }: Props) => {
  const [name, setName] = useState(null);

  const handleNameChange = () => {
    setName(name);
  };

  return (
    <DataContext.Provider value={{ name, handleNameChange }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
