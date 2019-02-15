/**
 * @description
 * 动态渲染列表：
 * 解决问题：长列表影响渲染性能，又不知道列表每个元素高度，根据元素个数渲染；
 *
 * 问题：滚动条大小会浮动变化
 *
 * @author kaik@sensedeal.ai
 */

import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { renderItem } from "./Item";

class DynamicList extends React.Component {
  state = {
    test: null,
    paddingTop: 110,
    paddingBottom: 0,
    startIndex: 0
  };

  constructor(props) {
    super(props);

    this.outerRef = undefined;
    this.innerRef1 = undefined;
    this.innerRef2 = undefined;

    this.midRef = undefined;
    this.currentScrollTop = 0;
  }

  privateChildren(startIndex) {
    const newChildren = [];
    React.Children.forEach(this.props.children, (child, index) => {
      if (!child) {
        return;
      }
      if (index < startIndex) {
        return;
      }
      if (index > startIndex + this.props.renderCount - 1) {
        return;
      }
      const key = child.key;
      newChildren.push(React.cloneElement(child));
    });

    return newChildren;
  }

  onScroll = () => {
    //向下滚动
    const outerScrollHeight = this.outerRef.scrollHeight;
    const outerScrollTop = this.outerRef.scrollTop;
    const outerHeight = this.outerRef.offsetHeight;

    if (outerScrollTop > this.currentScrollTop) {
      this.currentScrollTop = outerScrollTop;
      console.log("!!");
      console.log(
        `outerScrollHeight:${outerScrollHeight}--${outerScrollTop +
          outerHeight}`
      );
      //滚动到底部 渲染操作；
      if (outerScrollHeight - outerScrollTop - outerHeight < 1) {
        this.setState({
          startIndex: this.state.startIndex + 30,
          paddingTop: this.state.paddingTop + this.innerRef1.offsetHeight
        });
      }

      return;
    }

    //向上滚动
    this.currentScrollTop = outerScrollTop;
    if (
      this.state.startIndex > 0 &&
      outerScrollTop - this.state.paddingTop < 10
    ) {
      this.setState({
        startIndex: this.state.startIndex - 30,
        paddingTop: this.state.paddingTop - this.innerRef2.offsetHeight
      });
    }
  };

  render() {
    return (
      <div
        onScroll={this.onScroll}
        ref={ref => {
          this.outerRef = ref;
        }}
        className="dynamic-list-container"
      >
        <div
          className="dynamic-list"
          ref={ref => {
            this.midRef = ref;
          }}
          style={{
            paddingTop: this.state.paddingTop,
            paddingBottom: this.state.paddingBottom
          }}
        >
          <div
            className="dynamic-list-inner"
            ref={ref => {
              this.innerRef1 = ref;
            }}
          >
            {this.privateChildren(this.state.startIndex)}
          </div>
          <div
            className="dynamic-list-inner"
            ref={ref => {
              this.innerRef2 = ref;
            }}
          >
            {this.privateChildren(
              this.state.startIndex + this.props.renderCount
            )}
          </div>
        </div>
      </div>
    );
  }
}

DynamicList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  style: PropTypes.object,
  className: PropTypes.string,
  renderCount: PropTypes.number,
  type: PropTypes.string
};

DynamicList.defaultProps = {
  children: null,
  renderCount: 30,
  type: "list"
};

DynamicList.Item = renderItem;
export { DynamicList };
