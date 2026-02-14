import { useState, useImperativeHandle } from "react";
import {
  Button,
  Stack
} from '@mui/material'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" size="small" color="primary" type="submit" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Stack spacing={10} sx={{ maxWidth: 400, width: '100%' }}>
        <Button variant="contained" size="small" color="secondary" type="submit" onClick={toggleVisibility} sx={{ width: 400 }}>Cancel</Button>
        </Stack>
      </div>
    </div>
  );
};

export default Togglable;
