import React from "react";

export default class Quote extends React.Component {
  state = {
    // newStyle: [
    //   { color: "green", fontWeight: "bold" },
    //   { color: "red", fontWeight: "bold", textDecoration: "line-through" }
    // ]
    newStyle: null,
    likeness: null
  };

  handleLike = () => {
    this.props.setLiked(this.props.id, this.props.likeness);
    this.setState({
      newStyle: { color: "green", fontWeight: "bold" },
      likeness: true
    });
  };

  handleDislike = () => {
    this.props.setDisliked(this.props.id, this.props.likeness);
    this.setState({
      newStyle: {
        color: "red",
        fontWeight: "bold",
        textDecoration: "line-through"
      },
      likeness: false
    });
  };

  render() {
    return (
      <div>
        <div></div>
        <p style={this.state.newStyle}>{this.props.quoteText}</p>
        <p>By: {this.props.quoteAuthor}</p>
        <button onClick={this.handleLike}>:)</button>
        <button onClick={this.handleDislike}>:(</button>
      </div>
    );
  }
}
