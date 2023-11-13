/*
 *
 * HomePage
 *
 */

import React, { Fragment, useRef, useState } from "react";
import socket from "socket.io-client";

// https://design-system.strapi.io/components
import { BaseHeaderLayout, Box, Button } from "@strapi/design-system";

const HomePage = () => {
  const [updates, setUpdates] = useState<string[]>([]);
  const [showOutput, setShowOutput] = useState(false);
  const [deployDisabled, setDeployDisabled] = useState(false);

  const codeEndRef = useRef<HTMLDivElement>(null);

  const websocketDeploy = () => {
    setDeployDisabled(true);
    setUpdates([]);
    setShowOutput(true);
    const io = socket("http://localhost:1337", { path: "/sami-website-deploy/" }); //Connecting to Socket.io backend

    io.on("message", async (data, error) => {
      //Listening for a message connection
      setUpdates((existing) => [...existing, data]);
      codeEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    io.emit("deploy", (error) => {
      if (error) return alert(error);
    });
  };

  return (
    <div>
      <BaseHeaderLayout title="SAMI Admin" as="h2" />
      <Box paddingLeft={10} paddingRight={10} background="neutral100">
        {/* <Button onClick={() => triggerDeploy()}>Deploy to live site</Button> */}
        <Button disabled={deployDisabled} onClick={() => websocketDeploy()}>
          Deploy Content Changes
        </Button>
      </Box>
      {showOutput && (
        <Box paddingLeft={10} paddingRight={10} background="black" style={{ height: 400, overflow: "auto" }}>
          <code style={{ color: "white" }}>
            {updates.map((u) => (
              <Fragment key={u}>
                {u}
                <br></br>
              </Fragment>
            ))}
          </code>
          <div ref={codeEndRef} />
        </Box>
      )}
    </div>
  );
};

export default HomePage;

// const triggerDeploy = () => {
//   console.log("triggering deploy");
//   fetch("/sami-website-deploy/deploy", {
//     method: "GET", // default, so we can ignore
//   })
//     .then((response) => response.json())
//     .then((json) => console.log(json));
// };
