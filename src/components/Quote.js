import React from "react";

export default class Quote extends React.Component {
  state = {
    newStyle: null
  };

  handleLike = () => {
    this.props.addLike(this.props.id);
    this.setState({ newStyle: { color: "green", fontWeight: "bold" } });
  };

  handleDislike = () => {
    this.props.addDislike(this.props.id);
    this.setState({
      newStyle: {
        color: "red",
        fontWeight: "bold",
        textDecoration: "line-through"
      }
    });
  };

  render() {
    return (
      <div>
        <p style={this.state.newStyle}>{this.props.quoteText}</p>
        <p>By: {this.props.quoteAuthor}</p>
        <button onClick={this.handleLike}>:)</button>
        <button onClick={this.handleDislike}>:(</button>
      </div>
    );
  }
}
