import React from 'react';

const SearchBookResult = ({ item, setBookImageUrl, setModalState }) => {
  const handleSearchResultItemClick = () => {
    setBookImageUrl(item.image);
    setModalState(false);
  };

  return (
    <div onClick={handleSearchResultItemClick}>
      {/* ... Your search result item layout ... */}
      <img src={item.image} alt="Book Cover" />
      <div>
        <h3>{item.title}</h3>
        <p>{item.author}</p>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default SearchBookResult
