import React from "react";
import Quote from "./Quote";
import AddQuote from "./AddQuote";

export default class QuoteSearcher extends React.Component {
  state = {
    fetching: null,
    quotes: [],
    authors: [],
    likes: 0,
    dislikes: 0,
    search: "",
    newStyle: null
  };

  componentDidMount() {
    fetch(
      `https://quote-garden.herokuapp.com/quotes/search/${this.state.search}`
    )
      .then(response => response.json())
      .then(quote => {
        if (quote.count === 0) {
          alert("No results were found. Please, try again.");
          this.setState({ fetching: false });
        } else {
          this.setState({
            fetching: false,
            quotes: quote.results,
            authors: Array.from(
              new Set(quote.results.map(quote => quote.quoteAuthor))
            )
          });
        }
      });
  }

  handleSearch = () => {
    this.setState({ ...this.state, fetching: true, likes: 0, dislikes: 0 });
    this.componentDidMount();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  setLiked = (id, likeness) => {
    this.state.quotes.map(quote => {
      if (quote._id === id) {
        this.setState({ ...this.state, likes: this.state.likes + 1 });
      }
    });
  };

  setDisliked = (id, likeness) => {
    this.state.quotes.map(quote => {
      if (quote._id === id) {
        this.setState({ ...this.state, dislikes: this.state.dislikes + 1 });
      }
    });
  };

  addNewQuote = newQuote => {
    console.log("newQuote is", newQuote);
    const quoteObject = { quoteText: newQuote, quoteAuthor: "Shakespeare" };
    this.setState({
      quotes: this.state.quotes.concat(quoteObject),
      authors: this.state.authors.concat("Shakespeare")
    });
    console.log(this.state.quoteAuthor);
  };

  render() {
    if (this.state.fetching === null) {
      return (
        <div>
          <h1>Quotes</h1>
          <div>
            <form onSubmit={this.handleSearch}>
              <label>
                <input
                  type="text"
                  name="search"
                  onChange={this.handleChange}
                  value={this.state.search}
                />
              </label>
              <input type="submit" value="Search" />
            </form>
          </div>

          <h2>Liked:{this.state.likes}</h2>
          <h2>Disliked:{this.state.dislikes}</h2>
        </div>
      );
    } else if (this.state.fetching === true) {
      return (
        <div>
          <h1>Quotes</h1>
          <h4>LOADING...</h4>
        </div>
      );
    } else if (this.state.fetching === false) {
      return (
        <div>
          <h1>Quotes</h1>

          <div>
            <form onSubmit={this.handleSearch}>
              <label>
                <input
                  type="text"
                  name="search"
                  onChange={this.handleChange}
                  value={this.state.search}
                />
              </label>
              <input type="submit" value="Search" />
            </form>
          </div>

          <div>
            <AddQuote addNewQuote={this.addNewQuote} newQuote={this.newQuote} />
          </div>

          <h2>Liked:{this.state.likes}</h2>
          <h2>Disliked:{this.state.dislikes}</h2>

          <h3>Number of distinct authors: {this.state.authors.length}</h3>
          <h3>Number of quotes: {this.state.quotes.length}</h3>

          {this.state.quotes.map(quote => (
            <Quote
              key={quote._id}
              quoteText={quote.quoteText}
              quoteAuthor={quote.quoteAuthor}
              newStyle={this.state.newStyle}
              id={quote._id}
              likeness={this.state.likes}
              setLiked={this.setLiked}
              setDisliked={this.setDisliked}
            ></Quote>
          ))}
        </div>
      );
    } else {
      return null;
    }
  }
}
