import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import theme from "../../theme/theme";

const CustomIcon = styled("span")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "3px",
  width: theme.spacing(1.75),
  height: theme.spacing(1.75),
  border: `1px solid ${theme.palette.checkbox.border}`,
  "input:hover ~ &": {
    backgroundColor: theme.palette.checkbox.hover,
  },
  "input:disabled ~ &": {
    border: `1px solid ${theme.palette.checkbox.disabled}`,
    background: theme.palette.common.white,
  },
}));

const CustomCheckedIcon = styled(CustomIcon)({
  backgroundColor: theme.palette.checkbox.main,
  borderColor: theme.palette.checkbox.main,
  "&:before": {
    display: "block",
    width: "100%",
    height: "100%",
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='8' viewBox='0 0 10 8'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M9.1998 1.58252L8.32879 0.700195L3.55504 5.53157L1.67622 " +
      "3.6273L0.799805 4.50884L3.55539 7.3002L9.1998 1.58252Z' fill='white'/%3E%3C/svg%3E\")",
    backgroundPosition: "center",
    content: '""',
    backgroundRepeat: "no-repeat",
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.checkbox.dark,
    borderColor: theme.palette.checkbox.dark,
  },
});

const CustomCheckBox = styled((props) => (
  <Stack direction="row" spacing={theme.spacing(1.75)}>
    <Checkbox
      disableRipple
      checkedIcon={<CustomCheckedIcon />}
      icon={<CustomIcon />}
      {...props}
    />
    {props?.label && (
      <Typography component="span" variant="body1">
        {props?.label}
      </Typography>
    )}
  </Stack>
))(() => ({
  "&.MuiCheckbox-root": {
    padding: 0,
    "&:hover": { bgcolor: "transparent" },
  },
}));

export default CustomCheckBox;
