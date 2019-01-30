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

class MyGifs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        gifImages: [],
        gifIndex: 0,
        isOpen: false,
        favoriteGifIds: [],
        favoriteGifs: [],
    }
    this.onToggleStar = this.onToggleStar.bind(this);
    this.deleteFavoriteGif = this.deleteFavoriteGif.bind(this);
  }

  componentWillMount() {
    this.props.fetchFavoriteGifs();
    const favoriteGifIds = this.props.gifs.map((gif) => {
      return gif.id;
    });
    const gifImages = this.props.gifs.map(gif => {
       return gif.imageUrl;
    });
    this.setState({ favoriteGifIds, favoriteGifs: this.props.gifs, gifImages });
  }
  componentWillReceiveProps(nextProps) {
    const favoriteGifIds = nextProps.gifs.map((gif) => {
      return gif.id;
    });
    const gifImages = nextProps.gifs.map(gif => {
       return gif.imageUrl;
    });
    this.setState({ favoriteGifIds, favoriteGifs: nextProps.gifs, gifImages });
  }

  GifSelected(gifIndex) {
    this.setState({ isOpen: true, gifIndex });
  }

  onToggleStar(gif) {
    const favoriteGifIds = this.state.favoriteGifIds;
    const favoriteGifs = this.state.favoriteGifs;
    if (favoriteGifIds.includes(gif.id)) {
      this.deleteFavoriteGif(gif.id);
      favoriteGifIds.splice(favoriteGifIds.indexOf(gif.id), 1);
      favoriteGifs.splice(favoriteGifs.indexOf(gif), 1);
    } else {
      this.saveGif(gif);
      favoriteGifIds.push(gif.id);
    }
    this.setState({ favoriteGifIds, favoriteGifs });
  }

  deleteFavoriteGif(gifId) {
    firestore.collection("Gifs").doc(gifId).delete().then(function() {
    console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }

  render() {
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
        <div className="mygifs_title">My Gifs</div>
        { this.state.favoriteGifs.length !== 0 ?
        <GifList
          Gifs={this.state.favoriteGifs}
          handleGifSelect={this.GifSelected.bind(this)}
          handleStarToggle={this.onToggleStar}
          favoriteGifIds={this.state.favoriteGifIds}
        /> :
        <div className="no_gifs_text">No favorite Gifs have been saved</div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    gifs: state.myGifs.gifs,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchFavoriteGifs,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGifs);
