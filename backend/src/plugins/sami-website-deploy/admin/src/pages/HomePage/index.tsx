/*
 *
 * HomePage
 *
 */

import React, { Fragment, useRef, useState } from "react";
import { GridLayout } from "@strapi/design-system";
import { Link } from "@strapi/design-system";
import socket from "socket.io-client";

// https://design-system.strapi.io/components
import { BaseHeaderLayout, Box, Button } from "@strapi/design-system";

const HomePage = () => {
  const [updates, setUpdates] = useState<string[]>([]);
  const [showOutput, setShowOutput] = useState(false);
  const [deployDisabled, setDeployDisabled] = useState(false);
  const [inspectLink, setInspectLink] = useState("");
  const [previewLink, setPreviewLink] = useState("");

  const codeEndRef = useRef<HTMLDivElement>(null);

  const websocketDeploy = () => {
    setDeployDisabled(true);
    setUpdates([]);
    setShowOutput(true);
    const io = socket("http://localhost:1337", { path: "/sami-website-deploy/" }); //Connecting to Socket.io backend

    io.on("message", async (data: string, error) => {
      //Listening for a message connection
      setUpdates((existing) => [...existing, data]);
      codeEndRef.current?.scrollIntoView({ behavior: "smooth" });
      if (data.startsWith("Inspect: https://vercel.com/")) {
        setInspectLink(data.split(" ")[1]);
      }
      if (data.startsWith("https://sami-website")) {
        setPreviewLink(data);
      }
    });
    io.emit("deploy", (error) => {
      if (error) return alert(error);
    });
  };

  return (
    <div>
      <BaseHeaderLayout title="SAMI Admin" as="h2" />
      <Box paddingLeft={10} paddingRight={10} background="neutral100" marginBottom={4}>
        {/* <Button onClick={() => triggerDeploy()}>Deploy to live site</Button> */}
        <GridLayout style={{ gap: "8px" }}>
          <Button disabled={deployDisabled} onClick={() => websocketDeploy()}>
            Deploy Preview
          </Button>
          <Link
            disabled={!inspectLink}
            isExternal
            href={inspectLink}
            rel="noopener noreferrer"
            style={{ margin: "auto", visibility: deployDisabled ? "visible" : "hidden" }}
          >
            Build Inspect
          </Link>
          <Link
            disabled={!previewLink}
            isExternal
            href={previewLink}
            rel="noopener noreferrer"
            style={{ margin: "auto", visibility: deployDisabled ? "visible" : "hidden" }}
          >
            Site Preview
          </Link>
        </GridLayout>
      </Box>
      {showOutput && (
        <Box margin={4} padding={4} background="black" style={{ height: 400, overflow: "auto" }}>
          <code style={{ color: "white", fontFamily: "monospace", lineHeight: "1rem" }}>
            {updates.map((u) => (
              <Fragment key={u}>
                {u}
                <br></br>
              </Fragment>
            ))}
          </code>
          <div ref={codeEndRef} style={{ marginBottom: "2rem" }} />
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
