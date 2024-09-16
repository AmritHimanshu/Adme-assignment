import React, { useEffect, useState } from "react";
import Image from "./image";
import { ReactComponent as Loading } from "./Loading.svg";

export type imageInterface = {
  author: string;
  download_url: string;
  height: Number;
  id: string;
  url: string;
  width: Number;
};

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function ImageContainer() {
  const BaseUrl = process.env.REACT_APP_BASE_URL;

  const [images, setImages] = useState<imageInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  let limit = 20;
  let page = 1;

  const getImages = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${BaseUrl}?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      setImages((img) => [...img, ...data]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      window.alert(error);
      setIsLoading(false);
    }
  };

  const handleScroll = debounce(() => {
    if ( document.documentElement.clientHeight + window.pageYOffset >= (document.documentElement.scrollHeight - 500) ) {
      page = page + 1;
      getImages();
    }
  }, 500);

  useEffect(() => {
    getImages();

    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-items-center">
        {images?.map((image) => (
          <Image key={image?.id} source={image.download_url} />
        ))}
      </div>

      {isLoading && <Loading className="w-[100px] m-auto" />}
    </>
  );
}

export default ImageContainer;
