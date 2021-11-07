import React from "react";

import PullRefresh from "..";

const PullRefreshDemo = () => {

  const onRefresh = (flag?: boolean) => {
    
  }

  return <PullRefresh onRefresh={() => onRefresh(false)}>
  pull
  </PullRefresh>
}

export default PullRefreshDemo
