import React, { Component } from "react";

import PokemonCard from "./PokemonCard";
import Loading from "../layout/Loading";
import axios from "axios";
import ReactPaginate from "react-paginate";

import './pagination.css'

export default class PokemonList extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon/?limit=807",
    pokemon: null,
    offset: 0,
    perPage: 20,
    currentPage: 0,
    pageCount: null
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    const data = res.data["results"];
    const count = data.length;
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    const postData = slice.map(pokemon => (
      <React.Fragment>
        <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
      </React.Fragment>
    ));
    this.setState({
      pokemon: res.data["results"],
      pageCount: Math.ceil(data.length / this.state.perPage),
      postData
    });
  }

  handlePageClick = e => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset
      },
      () => {
        this.componentDidMount();
      }
    );
  };

  render() {
    return (
      <div>
        {this.state.pokemon ? (
          <div className="row">
            {this.state.postData}
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}
