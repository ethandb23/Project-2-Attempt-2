import React from 'react';
import favoritesStyles from './FavoritesStyles.module.css';

const FavoritesList = (props) => {
  return (
    <table className={favoritesStyles.favoritesList}>
      <thead>
        <tr>
          <th>Favorite Jokes</th>
        </tr>
      </thead>
      <tbody>
        {props.favorites.map((joke, index) => (
          <tr key={index}>
            <td>{joke}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FavoritesList;
