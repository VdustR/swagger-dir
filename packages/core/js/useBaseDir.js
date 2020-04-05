import { useLocation } from "react-router-dom";

const useBaseDir = () => {
  const { pathname } = useLocation();
  return pathname;
};

export default useBaseDir;
