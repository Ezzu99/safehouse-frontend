import { createMuiTheme } from "@mui/material";

const HeadingFont = createMuiTheme({
    typography: {
      fontFamily: [
        'Poppins',
        'sans-serif',
      ].join(','),
    },
})

export default HeadingFont;