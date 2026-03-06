import { default as React } from 'react';
import { VariableGroup } from '../types';
interface VariablePanelProps {
    groups: VariableGroup[];
    onInsert: (key: string, type: "string" | "number" | "object", group: string, formattedExpression?: string) => void;
    activeGroup?: string;
    onGroupChange?: (group: string) => void;
}
declare const VariablePanel: React.FC<VariablePanelProps>;
export default VariablePanel;
