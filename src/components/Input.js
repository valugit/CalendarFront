import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import InputBase from "@material-ui/core/InputBase";

const Input = withStyles(theme => ({
    root: {
        '&.Mui-error input': {
            borderColor: "#ff0200",
        },
        margin: theme.spacing(1),
        "&#chatInput-helper-text": {
            color: 'red',
            backgroundColor: "blue"
        },
        borderRadius: 5,
        border: '1px solid #d3d8e3',
        padding: '10px 12px',
    },
    input: {
        position: 'relative',
        backgroundColor: 'transparent',
        color: 'white',
        opacity: 0.9,
        fontSize: 18,
        width: '100%',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        textAlign: "left",
        '&:focus': {
            borderColor: "#828a9b",
            opacity: 1
        }
    },
}))(InputBase);

export default Input;