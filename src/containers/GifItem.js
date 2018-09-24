import React from 'react';

const GifItem = (props) => {
  const star = props.isFavorite ? 'star' : 'star-o';
  const isFilled = props.isFavorite ? "starFilled" : "star_empty";
  const imageURL = props.image;
  return (
    <div className="gif_container" onClick={props.onGifSelect}>
      <img className="gif_image" src={imageURL}/>
        <div className="star_overlay">
          <div className="star_icon"><i className={`fa fa-lg fa-${star} ${isFilled}`} aria-hidden="true" onClick={() => props.onToggleStar()}/></div>
        </div>
    </div>
  );
}

export default GifItem;
