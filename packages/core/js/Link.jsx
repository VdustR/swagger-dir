import { memo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const Link = ({ href, ...props }) => (
  <IconButton href={href} target="_blank" rel="noreferrer noopener" {...props}>
    <OpenInNewIcon />
  </IconButton>
);

export default memo(Link);
