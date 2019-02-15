import React from "react";
import PropTypes from "prop-types";

class renderItem extends React.Component {
  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

renderItem.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string
};

renderItem.defaultProps = {
  type: "list"
};

export { renderItem };
