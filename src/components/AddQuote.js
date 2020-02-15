import React from "react";

export default class AddQuote extends React.Component {
  state = { name: "", newQuote: "" };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addNewQuote(this.state.newQuote);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="add-player">
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              name="newQuote"
              onChange={this.handleChange}
              value={this.state.newQuote}
            />
          </label>
          <input type="submit" value="Add your quote" />
        </form>
      </div>
    );
  }
}
