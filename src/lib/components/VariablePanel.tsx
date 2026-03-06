import React, { useState } from "react";
import type { VariableGroup, Variable } from "../types";

interface VariablePanelProps {
  groups: VariableGroup[];
  onInsert: (
    key: string,
    type: "string" | "number" | "object",
    group: string,
    formattedExpression?: string
  ) => void;
  activeGroup?: string;
  onGroupChange?: (group: string) => void;
}

const VariablePanel: React.FC<VariablePanelProps> = ({
  groups,
  onInsert,
  activeGroup,
  onGroupChange,
}) => {
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(activeGroup ?? groups[0]?.key ?? "");

  const handleGroupChange = (key: string) => {
    setSelectedGroup(key);
    onGroupChange?.(key);
  };

  const currentGroup = groups.find((g) => g.key === selectedGroup);
  const variables: Variable[] = currentGroup?.variables ?? [];

  const filtered = search.trim()
    ? variables.filter(
        (v) =>
          v.key.toLowerCase().includes(search.toLowerCase()) ||
          v.label?.toLowerCase().includes(search.toLowerCase())
      )
    : variables;

  const handleClick = (variable: Variable) => {
    const isObject = variable.type === "object";
    const expr = isObject
      ? `{{ ${selectedGroup}.${variable.key} | json }}`
      : `{{ ${selectedGroup}.${variable.key} | default: " " }}`;
    onInsert(variable.key, variable.type, selectedGroup, expr);
  };

  return (
    <div className="flex flex-col h-full border-r bg-gray-50">
      {/* Group tabs */}
      {groups.length > 1 && (
        <div className="flex border-b bg-white overflow-x-auto flex-shrink-0">
          {groups.map((g) => (
            <button
              key={g.key}
              onClick={() => handleGroupChange(g.key)}
              className={`px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 -mb-px transition-colors ${
                selectedGroup === g.key
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="p-2 flex-shrink-0">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search variables…"
          className="w-full border rounded px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>

      {/* Variables list */}
      <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1">
        {filtered.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-6">No variables found.</p>
        )}
        {filtered.map((variable) => (
          <button
            key={variable.key}
            onClick={() => handleClick(variable)}
            className="w-full text-left px-3 py-2 rounded hover:bg-indigo-50 hover:text-indigo-700 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gray-700 group-hover:text-indigo-700 truncate">
                {variable.key}
              </span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ml-2 flex-shrink-0 ${
                  variable.type === "object"
                    ? "bg-purple-100 text-purple-600"
                    : variable.type === "number"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {variable.type}
              </span>
            </div>
            {variable.label && (
              <p className="text-[11px] text-gray-400 truncate mt-0.5">{variable.label}</p>
            )}
          </button>
        ))}
      </div>

      {/* Insert hint */}
      <div className="p-2 border-t bg-white flex-shrink-0">
        <p className="text-[10px] text-gray-400 text-center">
          Click a variable to insert it at the cursor
        </p>
      </div>
    </div>
  );
};

export default VariablePanel;
