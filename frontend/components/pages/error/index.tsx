import type { FC } from "react";
import React from "react";

import Link from "next/link";

interface IProps {
  statusCode: number;
}

const IndexPageComponent: FC<IProps> = ({ statusCode }) => {
  return (
    <div>
      <p className="text-xl text-center">
        {statusCode ? `An error ${statusCode} occurred on server` : "An error occurred on client"}
      </p>
      <Link href="/">
        <button>Return to the home page</button>
      </Link>
    </div>
  );
};

export default IndexPageComponent;
