import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { join } from "path";
import { memo, useMemo } from "react";
import { resolve } from "url";
import Copy from "./Copy";
import Link from "./Link";

const Item = ({ dir = "", file, ...props }) => {
  const href = useMemo(
    () =>
      resolve(
        window.location.href,
        `./swagger-ui/?url=${encodeURIComponent(join("../data", dir, file))}`
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
