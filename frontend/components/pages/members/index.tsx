import React from "react";
import { IMember } from "types/member";
import { MembersListItemComponent } from "./list-item";

export const MembersComponent: React.FC<{ members: IMember[] }> = ({ members }) => {
  return (
    <>
      <h1 style={{ fontSize: "20px", fontWeight: "600", margin: "20px 0 10px 0" }}>Members and Volunteers</h1>
      <div>
        SAMI is extremely thankful to have a fantastic team of members and volunteers that support the works in the UK
        and Africa. Here are a few of the people that make everything possible day-to-day:
      </div>
      <nav>
        <ul
          style={{
            textTransform: "uppercase",
            display: "flex",
            flexDirection: "row",
            listStyleType: "none",
            justifyContent: "center",
          }}
        >
          <li style={{ padding: "2px 6px", border: "0.8px solid #ddd" }}>all</li>
          <li style={{ padding: "2px 6px", border: "0.8px solid #ddd" }}>SAMI</li>
          <li style={{ padding: "2px 6px", border: "0.8px solid #ddd" }}>AMI</li>
          <li style={{ padding: "2px 6px", border: "0.8px solid #ddd" }}>SAMI Trustees</li>
        </ul>
      </nav>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 2fr 2fr", margin: "15px 0" }}>
        {members.map((member) => (
          <MembersListItemComponent key={member.id} member={member} />
        ))}
      </div>
    </>
  );
};
