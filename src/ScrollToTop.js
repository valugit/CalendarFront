import React, { useEffect } from 'react';
import { withRouter } from "react-router";

const ScrollToTop = props => {
    useEffect(() => window.scrollTo(0, 0), [props.location]);
    return null;
};

export default withRouter(ScrollToTop);