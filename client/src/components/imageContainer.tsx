import React, { useEffect, useState } from "react";
import Image from "./image";

export type image = {
  author: string;
  download_url: string;
  height: Number;
  id: string;
  url: string;
  width: Number;
};

function ImageContainer() {
  const [images, setImages] = useState<image[]>([]);

  let limit = 50;
  let page = 1;

  const getImages = async () => {
    try {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      // console.log(data);
      setImages(data);
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };

  const handleScroll = () => {
    if (document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
        page = page + 1;
        getImages();
    }
  };

  useEffect(() => {
    getImages();

    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-items-center space-y-">
      {images?.map((image) => (
        <Image key={image?.id} source={image.download_url} />
      ))}
    </div>
  );
}

export default ImageContainer;
