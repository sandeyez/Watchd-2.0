import React, { useState } from "react";
import Carousel from "react-spring-3d-carousel";
import SearchResult from "./../Search/SearchResult";
import { config } from "react-spring";

function CarousalView({ movies }) {
  let slides = movies.map((movie) => ({
    content: (
      <div className="flex align-bottom">
        <SearchResult movie={movie} key={movie.id} />
      </div>
    ),
    key: movie.id,
  }));

  return (
    <div className="absolute w-[1080px] top-80">
      <Carousel
        slides={slides}
        offsetRadius={2}
        showNavigation
        animationConfig={config.gentle}
      />
    </div>
  );
}

export default CarousalView;
