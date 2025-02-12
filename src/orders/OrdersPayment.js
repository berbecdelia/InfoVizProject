// eslint-disable-next-line no-unused-vars

import React from "react"

import { OrdinalFrame } from "semiotic"
import MarkdownText from "../MarkdownText"
import theme from "../theme"

const ROOT = "http://127.0.0.1:3001/"


const frameProps = {  
    data: [],
    size: [700,700],
    type: "bar",
    projection: "horizontal",
    oAccessor: ["x"],
    rAccessor: "y",
    oLabel: true,
    margin: { left: 160, bottom: 90, right: 10, top: 40 },
    style: { fill: "#ac58e5", stroke: "white" },
    // pieceHoverAnnotation: true,
    // title: "Most orders per city",
    pieceHoverAnnotation: [
      {
        type: "highlight",
        style: {
          stroke: "white",
          fill: "none",
          strokeWidth: 4,
          strokeOpacity: 0.5
        }
      },
      { type: "frame-hover" }
    ],
    tooltipContent: d => {
      const bothValues = [
        <div style={{ color: theme[0] }} key={"x"}>
          Payment value: {d.x}
        </div>,
        <div style={{ color: theme[1] }} key="y">
          Orders: {d.y}
        </div>
      ]
      const content = bothValues
      return (
        <div style={{ fontWeight: 900 }} className="tooltip-content">
          {content}
        </div>
      )
    }
};

export default class OrdersPayment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoaded: false,
      error: null
    };

    fetch(ROOT+'orderspayment')
      .then(response => response.json())
      .then(
        (res) => {
          this.setState({
              ...frameProps,
              data: res.response,
              isLoaded: true,
              error: null
          });
        },
        (error) => {
        this.setState({
            ...frameProps,
            isLoaded: true,
            error
        });
      });
  }

  render() {
    return (
        <div>
          <div>
            <MarkdownText
              text={`
              Orders by payment value`}
            />
            <OrdinalFrame {...this.state}
            />
          </div>
        </div>
    )}
  // }
}