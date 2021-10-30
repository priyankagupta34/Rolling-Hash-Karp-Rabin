import "./styles.css";
import React, { useState } from "react";
import rabinkarpRH from "./RabinKarp";

export default function App() {
  const [haystack, sethaystack] = useState(
    "this kill would be a bad idea but kill is what it is this kill is not so killian but killis important"
  );
  const [needle, setneedle] = useState("kill");

  const highlightMatches = function () {
    const indices = rabinkarpRH.initialise(haystack, needle, 256);
    const before = `<span style='text-decoration: underline; font-weight: bold; color: #c33'>`;
    const after = "</span>";
    const splittledHaystack = haystack.split("");
    indices.forEach((ndex) => {
      splittledHaystack[ndex] = before + splittledHaystack[ndex];
      splittledHaystack[ndex + needle.length] =
        after + (splittledHaystack[ndex + needle.length] || "");
    });
    return splittledHaystack.join("");
  };
  return (
    <div className="App">
      <h1>Rolling Hash</h1>

      <input value={haystack} onChange={(e) => sethaystack(e.target.value)} />
      <input value={needle} onChange={(e) => setneedle(e.target.value)} />

      <p
        className="grep-container"
        style={{ fontFamily: "monospace" }}
        dangerouslySetInnerHTML={{ __html: highlightMatches() }}
      />
    </div>
  );
}
