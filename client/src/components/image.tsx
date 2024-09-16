import React from "react";

export type ImagePropsInterface = {
  source: string;
};

function Image({ source }: ImagePropsInterface) {
  return (
    <div className="my-5">
      <img src={source} alt="" className="w-[350px] 2xl:w-[400px]" />
    </div>
  );
}

export default Image;
