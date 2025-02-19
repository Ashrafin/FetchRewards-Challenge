import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CB5AE",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FF6978",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF"
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#4CB5AE",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#4CB5AE",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4CB5AE",
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          "& .MuiPaginationItem-root": {
            color: "#4CB5AE",
            "&.Mui-selected": {
              backgroundColor: "#4CB5AE",
              color: "#FFFFFF",
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#419F99",
          "&:hover": {
            backgroundColor: "rgba(83, 128, 131, 0.1)",
          },
        },
      },
    },
  },
});

export default theme;