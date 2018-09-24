import React from 'react';
import _ from 'lodash';
import GphApiClient from 'giphy-js-sdk-core';
import Lightbox from 'react-image-lightbox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchBar from './SearchBar'
import GifList from './GifList';
import {
  fetchFavoriteGifs
} from '../actions';
var Firebase = require("firebase");
require ('firebase/firestore');

const firestore = Firebase.firestore();
const client = GphApiClient("F4pXZFqp96uWd0TOmBAx3RZnIAmGJxCb");

class GifBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        keyword: "",
        gifList: [],
        gifImages: [],
        gifIndex: 0,
        isOpen: false,
        favoriteGifIds: [],
    }
    this.gifSearch = this.gifSearch.bind(this);
    this.gifTrending = this.gifTrending.bind(this);
    this.onToggleStar = this.onToggleStar.bind(this);
    this.saveGif = this.saveGif.bind(this);
    this.deleteFavoriteGif = this.deleteFavoriteGif.bind(this);
  }

  componentWillMount() {
    this.gifTrending();
    this.props.fetchFavoriteGifs();
  }


  componentWillReceiveProps(nextProps) {
    const favoriteGifIds = nextProps.gifs.map((gif) => {
    return gif.id;
    });
    this.setState({ favoriteGifIds });
  }

  gifTrending() {
    client.trending("gifs", {"limit": 15})
    .then((response) => {
      const gifImages = response.data.map(gif => {
         return gif.images.original.gif_url;
      });
      const gifList = response.data.map(gif => {
        return {
          id: gif.id,
          imageUrl: gif.images.original.gif_url
        }
      });
      this.setState({ gifList, gifImages });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  gifSearch(keyword) {
    client.search('gifs', {
      "q": keyword,
      "limit": 15,
    })
    .then((response) => {
      const gifImages = response.data.map(gif => {
         return gif.images.original.gif_url;
      });
      const gifList = response.data.map(gif => {
        return {
          id: gif.id,
          imageUrl: gif.images.original.gif_url
        }
      });
      this.setState({ gifList, gifImages });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  GifSelected(gifIndex) {
    this.setState({ isOpen: true, gifIndex });
  }

  handleKeywordChange(event) {
    this.setState({ keyword: event.target.value });
  }

  onToggleStar(gif) {
    const favoriteGifIds = this.state.favoriteGifIds;
    if (favoriteGifIds.includes(gif.id)) {
      this.deleteFavoriteGif(gif.id);
      favoriteGifIds.splice(favoriteGifIds.indexOf(gif.id), 1);
    } else {
      this.saveGif(gif);
      favoriteGifIds.push(gif.id);
    }
    this.setState({ favoriteGifIds });
  }

  saveGif(gif) {
    const user = Firebase.auth().currentUser;
    firestore.collection("Gifs").doc(gif.id).set({
      id: gif.id,
      imageUrl: gif.imageUrl,
    });
  }

  deleteFavoriteGif(gifId) {
    firestore.collection("Gifs").doc(gifId).delete().then(function() {
    console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }

  render() {
    const gifSearch = _.debounce((keyword) => {
      if (keyword !== "") {
        this.gifSearch(keyword);
      } else {
        this.gifTrending();
      }
    }, 300);

    const { gifImages, gifIndex } = this.state;
    return (
      <div className="home_Container">
        {this.state.isOpen && (
          <Lightbox
            mainSrc={gifImages[gifIndex]}
            nextSrc={gifImages[(gifIndex + 1) % gifImages.length]}
            prevSrc={gifImages[(gifIndex + gifImages.length - 1) % gifImages.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                gifIndex: (gifIndex + gifImages.length - 1) % gifImages.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                gifIndex: (gifIndex + 1) % gifImages.length,
              })
            }
          />
        )}
        <SearchBar handleSearchKeyword={gifSearch}/>
        <GifList
          Gifs={this.state.gifList}
          handleGifSelect={this.GifSelected.bind(this)}
          handleStarToggle={this.onToggleStar}
          favoriteGifIds={this.state.favoriteGifIds}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    gifs: state.gifBrowser.gifs,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchFavoriteGifs,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GifBrowser);
