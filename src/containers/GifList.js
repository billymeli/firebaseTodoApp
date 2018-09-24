import React from 'react';
import GifItem from './GifItem';

const GifList = (props) => {
  const GifItems = props.Gifs.map((gifObject, i) => {
    const isFavorite = props.favoriteGifIds.includes(gifObject.id);
    return (<GifItem
        gif={gifObject}
        onGifSelect={() => props.handleGifSelect(i)}
        onToggleStar={() => props.handleStarToggle(gifObject)}
        isFavorite={isFavorite}
        key={gifObject.id}
        image={gifObject.imageUrl} />
    );
  });

  return (
    <div className="gifs_container">
      {GifItems}
    </div>
  );
}

export default GifList;
