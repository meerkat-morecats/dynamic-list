import React from "react";
import PropTypes from "prop-types";

class renderItem extends React.Component {
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

renderItem.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

renderItem.defaultProps = {
  type: "list"
};

export { renderItem };
