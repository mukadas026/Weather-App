import React from "react";

const Loading = () => {
  return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 hidden">
<div className="w-full h-full rounded-full border-8 border-transparent border-t-8 border-t-red-600 animate-spin"></div>
  </div>;
};

export default Loading;
