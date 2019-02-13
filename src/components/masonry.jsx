import React, { Component } from "react";
import Masonry from "react-masonry-component";

const masonryOptions = {
  transitionDuration: 0
};

const imagesLoadedOptions = { background: ".my-bg-image-el" };

class Gallry extends Component {
  render() {
    const childElements = this.props.elements.map(function(element) {
      return (
        <li style={{listStyleType:'None'}} className="image-element-class">
          <img style={{width:'600px'}} src={element.src} />
        </li>
      );
    });

    return (
      <Masonry
        className={"my-gallery-class"} // default ''
        elementType={"ul"} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        imagesLoadedOptions={imagesLoadedOptions} // default {}
      >
        {childElements}
      </Masonry>
    );
  }
}

export default Gallry;
