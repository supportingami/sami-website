import { spawn } from "child_process";
import { resolve } from "path";
import { Server, Socket } from "socket.io";

export class DeployWebsocketService {
  // TODO - handle multiple connections via rooms/groups join
  private socket: Socket;
  constructor(private io: Server) {}

  public register() {
    this.io.on("connection", (socket) => {
      this.socket = socket;
      //Listening for a connection from the frontend
      socket.on("deploy", () => {
        // Listening for a join connection
        console.log("plugin deploying...", 5);
        this.triggerDeployment();
        // socket.emit("message", {
        //   // Sending a welcome message to the User
        //   user: "bot",
        //   text: ` Welcome to the group chat`,
        // });
      });
    });
  }

  private sendMessage(text: string) {
    return this.socket.emit("message", text);
  }

  private triggerDeployment() {
    const rootDir = resolve(__dirname, "../../../../../../../");
    console.log("triggering deployment");
    this.sendMessage("Starting deployment...");
    const child = spawn(`yarn`, ["build --export --no-backend --no-preview --deploy"], {
      cwd: rootDir,
      env: process.env,
      stdio: ["inherit", "pipe", "pipe"],
      shell: true,
    });
    let output = "";
    let err = "";

    process.stdout.write.bind(process.stdout);

    child.stderr.setEncoding("utf-8");
    child.stderr.on("data", (data) => {
      data = data.toString();
      console.log(data);
      this.sendMessage(removeAnsiStyles(data));
      err += data;
    });
    child.stdout.setEncoding("utf-8");
    child.stdout.on("data", (data) => {
      data = data.toString();
      console.log(data);
      this.sendMessage(removeAnsiStyles(data));
      output += data;
    });
    child.on("error", (e) => {
      console.log("child error", e);
    });
    child.on("exit", (e) => {
      console.log("child exit", e);
    });
    child.on("close", () => {
      console.log("close");
    });
  }
}

function removeAnsiStyles(s: string) {
  const regex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
  return s.replace(regex, "");
}
