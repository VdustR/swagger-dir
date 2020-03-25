import { useMemo } from 'react';
import useBaseDir from './useBaseDir';

const useFiles = () => {
  const baseDir = useBaseDir();
  // add leading and trailing slashes
  const formatDir = useMemo(
    () => baseDir.replace(/^\/?/, '/').replace(/\/?$/, '/'),
    [baseDir]
  );
  const filteredFiles = useMemo(
    () =>
      files
        .map(file => `/${file}`)
        .filter(file => file.substring(0, formatDir.length) === formatDir)
        .map(file => file.substring(formatDir.length)),
    [formatDir]
  );
  return filteredFiles;
};

export default useFiles;
