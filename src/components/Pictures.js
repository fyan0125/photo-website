import React from "react";

function Pictures({ data }) {
  return (
    <div className="picture">
      <div className="pictureItem">
        <div className="imageContainer">
          <a target="_blank" href={data.src.large}>
            <img src={data.src.large} alt="" />
          </a>
        </div>
        <p className="text">by {data.photographer}</p>
      </div>
    </div>
  );
}

export default Pictures;
