import { css } from '@emotion/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import LinkIcon from '@material-ui/icons/Link';
import { memo, useCallback, useRef, useState } from 'react';

const copyCss = css`
  opacity: 0;
  pointer-events: none;
  position: absolute;
`;

const Copy = ({ href, ...props }) => {
  const copyRef = useRef();
  const [success, setSuccess] = useState(false);
  const copyUrl = useCallback(() => {
    copyRef.current.select();
    document.execCommand('copy');
    setSuccess(true);
  }, []);
  const blurHandler = () => setSuccess(false);
  return (
    <Tooltip open={success} title="URL Copied!">
      <IconButton onClick={copyUrl} onBlur={blurHandler}>
        <LinkIcon />
        <input
          css={copyCss}
          ref={copyRef}
          value={href}
          onChange={Function.prototype}
        />
      </IconButton>
    </Tooltip>
  );
};

export default memo(Copy);
