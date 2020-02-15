import React from "react";
import Quote from "./Quote";

export default class QuoteSearcher extends React.Component {
  state = {
    fetching: null,
    quotes: [],
    authors: [],
    likes: null,
    dislikes: [],
    search: ""
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
          console.log(quote);

          ///maybe apply reduce here, before asining to "quotes:", to filter make the quotes unique (pay attention to the authors count)

          this.setState({
            fetching: false,
            quotes: quote.results,
            authors: Array.from(
              new Set(quote.results.map(quote => quote.quoteAuthor))
            )
          });
          console.log("STATE IS", this.state);
        }
      });
  }

  handleSearch = () => {
    this.setState({ ...this.state, fetching: true, likes: 0 });
    this.componentDidMount();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // addingLike = (id, like) => {
  //   this.setState({ ...this.state, likes: this.state.likes + 1 });
  // };

  // addingDislike = id => {
  //   // console.log("id is:", id);
  // };

  render() {
    const authors_copy = [...this.state.authors];

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

          <h2>Liked:{this.state.likes}</h2>
          <h2>Disliked:{this.state.dislikes}</h2>

          <h3>Number of distinct authors: {this.state.authors.length}</h3>
          <h3>Number of quotes: {this.state.quotes.length}</h3>

          {this.state.quotes.map(quote => (
            <Quote
              key={quote._id}
              quoteText={quote.quoteText}
              quoteAuthor={quote.quoteAuthor}
              addLike={this.addingLike}
              addDislike={this.addingDislike}
              id={quote._id}
              likeness={quote.likes}
            ></Quote>
          ))}
        </div>
      );
    } else {
      return null;
    }
  }
}

// addingLike = id => {
//   this.state.quotes.map(quote => {
//     console.log(quote);
//     if (quote._id === id) {
//       if (!this.state.likes.includes(quote)) {
//         console.log("is this single", quote);
//         this.setState({ ...this.state, likes: this.state.likes.push(quote) });

//         // return this.setState({
//         //   ...this.state,
//         //   likes: this.state.likes.push(quote)
//         // });
//         // console.log(this.state.likes.length);
//       } else {
//         return null;
//       }
//     } else {
//       return null;
//     }
//   });
//   console.log("likes arr:", this.state.likes);
// };

////////////////
////////////////
////////////////
