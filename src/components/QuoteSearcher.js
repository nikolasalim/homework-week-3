import React from "react";
import Quote from "./Quote";

export default class QuoteSearcher extends React.Component {
  state = {
    fetching: true,
    quotes: []
  };

  componentDidMount() {
    fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
      .then(response => response.json())
      .then(quote => {
        this.setState({ fetching: false, quotes: quote.results });
      });
  }

  render() {
    if (!this.state.fetching) {
      return (
        <div>
          <h1>Quotes</h1>
          {this.state.quotes.map(quote => (
            <Quote
              key={quote._id}
              quoteText={quote.quoteText}
              quoteAuthor={quote.quoteAuthor}
            ></Quote>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <h1>Quotes</h1>
          <h4>LOADING...</h4>
        </div>
      );
    }
  }
}
