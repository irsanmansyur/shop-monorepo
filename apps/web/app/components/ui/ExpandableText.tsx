import React, { useState } from "react";

interface Props {
  text: string;
}

const ExpandableText: React.FC<Props> = ({ text }) => {
  const [expanded, setExpanded] = useState(text.length > 200);

  return (
    <div>
      <div
        className={
          expanded
            ? ""
            : "line-clamp-2 overflow-hidden transition-all duration-200"
        }
        style={{
          display: "-webkit-box",
          WebkitLineClamp: expanded ? "unset" : 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {text}
      </div>
      <button
        className="text-blue-600 text-sm mt-1 flex items-center"
        onClick={() => setExpanded((e) => !e)}
      >
        {!expanded && (
          <>
            Selengkapnya <span className="ml-1">▼</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ExpandableText;
