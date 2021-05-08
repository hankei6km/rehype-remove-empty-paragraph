import { Plugin, Transformer } from 'unified';
import { Node, Root } from 'hast';

type RehypeRemoveEmptyParagraphOptions = {
  trimBr?: boolean;
};

export function hastTrimBr(tree: Root): void {
  tree.children.forEach((c) => {
    if (c.type === 'element' && c.tagName === 'p') {
      const top = c.children.findIndex(
        (v) => v.type !== 'element' || v.tagName !== 'br'
      );
      let bottom = c.children.length - 1;
      while (
        bottom >= 0 &&
        c.children[bottom].type === 'element' &&
        c.children[bottom].tagName === 'br'
      ) {
        bottom--;
      }
      c.children = c.children.slice(
        top >= 0 ? top : 0,
        bottom >= 0 ? bottom + 1 : c.children.length - 1
      );
    }
  });
}

export function hastRemoveEmptyParagraph(tree: Root): void {
  tree.children = tree.children.filter((c) => {
    if (c.type === 'element' && c.tagName === 'p') {
      if (c.children.length === 0) {
        return false;
      } else if (
        c.children.length === 1 &&
        c.children[0].type === 'element' &&
        c.children[0].tagName === 'br'
      ) {
        return false;
      }
    }
    return true;
  });
}

const rehypeRemoveEmptyParagraph: Plugin = function rehypeRemoveEmptyParagraph(
  { trimBr }: RehypeRemoveEmptyParagraphOptions = { trimBr: false }
): Transformer {
  // 最上位の paragraph のみ対象。リストや引用、ネストは扱わない。
  return function transformer(tree: Node): void {
    if (tree.type === 'root' && tree.children) {
      if (trimBr) {
        hastTrimBr(tree as Root);
      }
      hastRemoveEmptyParagraph(tree as Root);
    }
  };
};

export default rehypeRemoveEmptyParagraph;
