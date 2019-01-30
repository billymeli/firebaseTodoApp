import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';

export class GifItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      imageVisible: "hide_image"
    };
    console.log("this: ", this);
    this.handleImageLoad = this.handleImageLoad.bind(this);
  }

  handleImageLoad() {
    this.setState({ loading: false, imageVisible: "show_image" });
  }

  render () {
    const star = this.props.isFavorite ? 'star' : 'star-o';
    const isFilled = this.props.isFavorite ? "starFilled" : "star_empty";
    const imageUrl = this.props.image;
    return (
      <div>
        <div className="gif_container">
          <div className="spinner">
            <ClipLoader
              sizeUnit={"px"}
              size={50}
              color={'#d3d3d3'}
              loading={this.state.loading}
            />
          </div>
          <img className={`gif_image ${this.state.imageVisible}`} src={imageUrl} onLoad={this.handleImageLoad} onClick={this.props.onGifSelect}/>
          <div className="star_overlay">
            <div className="star_icon"><i className={`fa fa-lg fa-${star} ${isFilled}`} aria-hidden="true" onClick={() => this.props.onToggleStar()}/></div>
          </div>
        </div>
      </div>
    );
  }
}

export default GifItem;
