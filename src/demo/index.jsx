import React from "react";
import { DynamicList } from "../main";
// import "./style.scss";
const DListItem = DynamicList.Item;

class Demo extends React.Component {
  componentDidMount() {}

  render() {
    const dataSource = [];

    for (let i = 0; i < 10000; i++) {
      dataSource.push({
        title: `标题--${i}`,
        content: `内容内容内容内容内容内容内容内容内容内容内容内容`
      });
    }
    return (
      <div
        className="demo"
        style={{
          height: "500px",
          width: "200px",
          overflow: "hidden",
          border: "1px solid #390fea",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "40px"
        }}
      >
        <DynamicList>
          {dataSource.map((item, index) => (
            <DListItem key={index}>{item.title}</DListItem>
          ))}
        </DynamicList>
      </div>
    );
  }
}

export { Demo };
