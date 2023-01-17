import React from "react";

const Card = (props) => {
  return <div className='border border-transparent w-full min-h-[500px] h-fit pb-8 my-8 box-border rounded-xl bg-white/30 backdrop-blur-lg'>
  {props.children}
</div>
};

export default Card;
