// lib/withLists.ts
import { Editor, Element as SlateElement, NodeEntry, Transforms } from "slate";

/**
 * Ensure list structure Slate expects:
 *  - ul/ol must contain li children
 *  - li must contain block children (we wrap text nodes inside a paragraph)
 */
export const withLists = (editor: Editor): Editor => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry: NodeEntry) => {
    const [node, path] = entry;

    // Only run our checks for elements
    if (SlateElement.isElement(node)) {
      // 1) If node is a list (ol/ul) ensure children are li elements
      if (node.type === "ol" || node.type === "ul") {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          // If a child is not an element or not 'li', convert/wrap it into li
          if (!SlateElement.isElement(child) || child.type !== "li") {
            // If child is a text node, wrap it inside li > paragraph
            // If child is element but not li, change it to li (keeps its children)
            // Use Transforms.setNodes when possible, otherwise wrap.
            try {
              Transforms.setNodes(editor, { type: "li" }, { at: [...path, i] });
            } catch {
              // fallback: wrap it
              Transforms.wrapNodes(
                editor,
                { type: "li", children: [] },
                { at: [...path, i] }
              );
            }
          }
        }
      }

      // 2) Ensure each li contains block children (wrap inline/text into paragraph)
      if (node.type === "li") {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          // If a child is a text node (has 'text' property) => wrap into paragraph
          if (!SlateElement.isElement(child)) {
            Transforms.wrapNodes(
              editor,
              { type: "paragraph", children: [] },
              { at: [...path, i] }
            );
          } else {
            // If child is an element but *not* a block type you expect, optionally wrap
            // (You can extend this logic if you use headings, block quotes etc.)
            if (child.type !== "paragraph" && typeof child.type === "string") {
              // Keep it simple: allow paragraph or wrap other elements inside paragraph if needed.
              // (Comment out if you want to allow other block types)
            }
          }
        }
      }
    }

    // Call original normalize so Slate's built-in rules run too
    normalizeNode(entry);
  };

  return editor;
};
