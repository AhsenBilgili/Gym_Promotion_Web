import { createTheme } from "@mui/material";

function theme() {
  return createTheme({
    background:{color:"black"},
    palette: {
      mode: 'dark',
    },
    typography: {
      fontFamily: [
        "Inter",
        'Roboto',
      ].join(','),
    },
  });
}

export default theme;
