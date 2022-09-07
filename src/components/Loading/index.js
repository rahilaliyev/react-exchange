import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <ReactLoading type={"bubbles"} color={"#0e57d6"} height={70} width={70} />
    </div>
  );
};

export default Loading;
