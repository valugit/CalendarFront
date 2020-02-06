import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import ButtonBase from "@material-ui/core/ButtonBase";

export const ButtonPrimary = withStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        padding: "15px 30px",
        color: 'white',
        backgroundColor: '#52dccd',
        borderRadius: 10,
        fontSize: '1em',
        fontWeight: 400,
        fontStyle: 'normal',
        fontStretch: 'normal',
        textTransform: 'inherit',
        transition: '0.2s',
        whiteSpace: 'nowrap',
        '&:hover': {
            transition: '0.2s',
            backgroundColor: '#818a9d50'
        },
        '& .MuiTouchRipple-root': {
            display: 'none'
        }
    }
}))(ButtonBase);

export const ButtonText = withStyles(theme => ({
    root: {
        margin: theme.spacing(0),
        padding: '0',
        color: '#52dccd',
        backgroundColor: 'transparent',
        borderRadius: 0,
        fontSize: '1em',
        fontWeight: 400,
        fontStyle: 'normal',
        fontStretch: 'normal',
        textTransform: 'inherit',
        transition: '0.2s',
        whiteSpace: 'nowrap',
        '&:hover': {
            transition: '0.2s',
            color: '#818a9d50'
        },
        '& .MuiTouchRipple-root': {
            display: 'none'
        }
    }
}))(ButtonBase);

export const ButtonNavigation = withStyles(theme => ({
    root: {
        margin: theme.spacing(0),
        width: "100%",
        color: 'white',
        fontSize: '2em',
        fontWeight: 400,
        fontStyle: 'normal',
        fontStretch: 'normal',
        textTransform: 'inherit',
        transition: '0.2s',
        '&:hover': {
            transition: '0.2s',
            backgroundColor: '#818a9d50',
        },
        '& .MuiTouchRipple-root': {
            display: 'none'
        }
    }
}))(ButtonBase);