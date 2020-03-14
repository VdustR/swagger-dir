import { join } from 'path';
import { resolve } from 'url';
import { memo, useCallback, useMemo, useRef } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Copy from './Copy';
import Link from './Link';

const publicUrl = process.env.PUBLIC_URL;

const Item = ({ dir = '', file, ...props }) => {
  const href = useMemo(
    () =>
      resolve(
        window.location.href,
        `${join(publicUrl, 'swagger-ui')}/?url=${encodeURIComponent(
          join(publicUrl, 'data', baseDir, dir, file)
        )}`
      ),
    [dir, file]
  );
  return (
    <ListItem {...props}>
      <ListItemText primary={file} />
      <ListItemSecondaryAction>
        <Copy href={href} />
        <Link href={href} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default memo(Item);
