import React from "react";
import MuiCheckbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import styled from "styled-components";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  icon: {
    borderRadius: 2,
    width: 24,
    height: 24,
    border: "2px solid #B5B7BA",
    backgroundColor: "#ffffff",
    // backgroundImage:
    //   "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    // "$root.Mui-focusVisible &": {
    //   outline: "2px auto rgba(19,124,189,.6)",
    //   outlineOffset: 2
    // },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5"
    },
    "input:disabled ~ &": {
      background: "#fafafa"
    }
  },
  checkedIcon: {
    backgroundColor: "#ffffff",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:before": {
      width: 11.74,
      height: 9,
      backgroundImage: "url('/images/icons/confirm-black.svg')",
      content: '""'
    },
    // "input:hover ~ &": {
    //   backgroundColor: "#106ba3"
    // }
  },
  formControlLabel: {
    margin: 0,
  }
});

type Props = {
  label: React.ReactNode;
} & CheckboxProps;

const Checkbox = ({ label, className, ...props }: Props) => {
  const classes = useStyles();
  return (
    <FormControlLabel
      className={clsx(className,classes.formControlLabel)}
      control={
        <MuiCheckbox
          className={classes.root}
          disableRipple
          color="default"
          checkedIcon={
            <span className={clsx(classes.icon, classes.checkedIcon)} />
          }
          icon={<span className={classes.icon} />}
          inputProps={{ "aria-label": "decorative checkbox" }}
          {...props}
        />
      }
      label={label}
    />
  );
};

export default Checkbox;
