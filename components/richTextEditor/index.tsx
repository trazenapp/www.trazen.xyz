"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  createEditor,
  Descendant,
  BaseEditor,
  Transforms,
  Element as SlateElement,
  Editor,
  Node,
} from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { withHistory } from "slate-history";
import { Button } from "@/components/ui/button";
import { Italic } from "lucide-react";
import { Underline } from "lucide-react";
import { Bold } from "lucide-react";
import { List } from "lucide-react";
import { RiListOrdered } from "react-icons/ri";

type CustomElement = {
  type: "paragraph" | "ol" | "ul" | "li";
  children: CustomText[];
};
type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

type RichTextEditorProps = {
  description: Descendant[];
  setDescription: (value: Descendant[]) => void;
};

export default function RichTextEditor({
  description,
  setDescription,
}: RichTextEditorProps) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  // const initialValue: Descendant[] = [
  //   { type: "paragraph", children: [{ text: "" }] },
  // ];

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case "ol":
        return (
          <ol {...props.attributes} className="list-decimal pl-6">
            {props.children}
          </ol>
        );
      case "ul":
        return (
          <ul {...props.attributes} className="list-disc pl-6">
            {props.children}
          </ul>
        );
      case "li":
        return <li {...props.attributes}>{props.children}</li>;
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);

  const renderLeaf = useCallback((props: any) => {
    let { children } = props;
    if (props.leaf.bold) {
      children = <span className="font-extrabold">{children}</span>;
    }
    if (props.leaf.italic) {
      children = <span className="italic">{children}</span>;
    }
    if (props.leaf.underline) {
      children = <span className="underline">{children}</span>;
    }
    return <span {...props.attributes}>{children}</span>;
  }, []);

  type MarkFormat = "bold" | "italic" | "underline";

  const toggleMark = (editor: any, format: MarkFormat) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const isMarkActive = (editor: any, format: MarkFormat) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  type BlockFormat = "ol" | "ul";

  const toggleBlock = (editor: Editor, format: BlockFormat) => {
    const isActive = isBlockActive(editor, format);
    const isList = format === "ol" || format === "ul";

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n.type === "ol" || n.type === "ul"),
      split: true,
    });

    const newType = isActive ? "paragraph" : "li";
    Transforms.setNodes(editor, { type: newType });

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };

  const isBlockActive = (editor: Editor, format: string) => {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    });
    return !!match;
  };

  const [activeButtons, setActiveButtons] = useState<string[]>([]);
  const [activeButtonBlock, setActiveButtonBlock] = useState<string>("");
  const [isEditorActive, setIsEditorActive] = useState(false);
  return (
    <div>
      <Slate
        editor={editor}
        value={description}
        onChange={(newValue) => {
          const focused = ReactEditor.isFocused(editor);
          setIsEditorActive(focused);
          setDescription(newValue);
          console.log(newValue);
        }}
      >
        <Editable
          onFocus={() => setIsEditorActive(true)}
          onBlur={() => setIsEditorActive(false)}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter description..."
          className="border-[#434343] border-b-0 border rounded-t-md rounded-b-none !text-sm  text-[#f4f4f4] font-light h-40 pl-3 pt-6 focus-visible:!border-[#434343] focus-visible:!ring-[0] resize-none focus:outline-none"
          spellCheck
          onKeyDown={(event) => {
            if (event.ctrlKey) {
              switch (event.key) {
                case "b":
                  event.preventDefault();
                  toggleMark(editor, "bold");
                  break;
                case "i":
                  event.preventDefault();
                  toggleMark(editor, "italic");
                  break;
                case "u":
                  event.preventDefault();
                  toggleMark(editor, "underline");
                  break;
                case "z":
                  event.preventDefault();
                  (editor as any).undo();
                  break;
                case "y":
                  event.preventDefault();
                  (editor as any).redo();
                  break;
              }
            }
            if (event.ctrlKey && event.shiftKey) {
              switch (event.key) {
                case "7":
                  event.preventDefault();
                  toggleBlock(editor, "ol");
                  break;
                case "8":
                  event.preventDefault();
                  toggleBlock(editor, "ul");
                  break;
              }
            }
          }}
        />
      </Slate>
      <div className=" flex items-center gap-2 border-[1px] border-[#434343] border-t-[#303030] p-2 rounded-b-md ">
        <Button
          className={`rounded-full hover:bg-[#383838] p-2 h-5 w-5 ${activeButtons.includes("bold") ? "bg-[#303030]" : ""}`}
          type="button"
          onPointerDown={(e) => {
            e.preventDefault();
            if (isEditorActive) toggleMark(editor, "bold");

            if (isEditorActive) {
              setActiveButtons((buttons) =>
                buttons.includes("bold")
                  ? buttons.filter((b) => b !== "bold")
                  : [...buttons, "bold"]
              );
            }
          }}
        >
          <Bold className="text-[#a6a6a6]" />
        </Button>

        <Button
          className={`rounded-full hover:bg-[#383838] p-2 h-5 w-5 ${activeButtons.includes("italic") ? "bg-[#303030]" : ""}`}
          type="button"
          onPointerDown={(e) => {
            e.preventDefault();
            if (isEditorActive) toggleMark(editor, "italic");

            if (isEditorActive) {
              setActiveButtons((buttons) =>
                buttons.includes("italic")
                  ? buttons.filter((b) => b !== "italic")
                  : [...buttons, "italic"]
              );
            }
          }}
        >
          <Italic className="text-[#a6a6a6]" />
        </Button>
        <Button
          className={`rounded-full hover:bg-[#383838] p-2 h-5 w-5 ${activeButtons.includes("underline") ? "bg-[#303030]" : ""}`}
          type="button"
          onPointerDown={(e) => {
            e.preventDefault();
            if (isEditorActive) toggleMark(editor, "underline");

            if (isEditorActive) {
              setActiveButtons((buttons) =>
                buttons.includes("underline")
                  ? buttons.filter((b) => b !== "underline")
                  : [...buttons, "underline"]
              );
            }
          }}
        >
          <Underline className="text-[#a6a6a6]" />
        </Button>
        <p className="font-light text-[16px] text-[#a6a6a6] ">|</p>
        <Button
          className={`rounded-full hover:bg-[#383838] p-2 h-5 w-5 ${activeButtonBlock === "ul" ? "bg-[#303030]" : ""}`}
          type="button"
          onPointerDown={(e) => {
            e.preventDefault();
            if (isEditorActive) toggleBlock(editor, "ul");

            if (isEditorActive) {
              setActiveButtonBlock((button) => (button === "ul" ? "" : "ul"));
            }
          }}
        >
          <List className="text-[#a6a6a6]" />
        </Button>
        <Button
          className={`rounded-full hover:bg-[#383838] p-2 h-5 w-5 ${activeButtonBlock === "ol" ? "bg-[#303030]" : ""}`}
          type="button"
          onPointerDown={(e) => {
            e.preventDefault();
            if (isEditorActive) toggleBlock(editor, "ol");

            if (isEditorActive) {
              setActiveButtonBlock((button) => (button === "ol" ? "" : "ol"));
            }
          }}
        >
          <RiListOrdered className="text-[#a6a6a6]" />
        </Button>
      </div>
    </div>
  );
}
