# rehype-remove-empty-paragraph

`<p></p>` / `<p><br></p>` を削除する [rehype](https://github.com/rehypejs/rehype).

## Install

npm:

```
npm install rehype-remove-empty-paragraph
```

## Usage

code: `example/example.ts`

```typescript
import unified from 'unified';
import rehypeParse from 'rehype-parse';
import stringify from 'rehype-stringify';
import rehypeRemoveEmptyParagraph from '../src';

const html = '<p>foo</p><p><br></p><p><br>bar<br></p>';
unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeRemoveEmptyParagraph, { trimBr: true })
  .use(stringify)
  .freeze()
  .process(html, (err, file) => {
    if (err) {
      console.error(err);
    }
    console.log(String(file));
  });
```

yield:

```html
<p>foo</p><p>bar</p>
```

## API

### `rehypeRemoveEmptyParagraph([options])`

`<p></p>` / `<p><br></p>` を削除する.
Paragraph は `root / paragraph` 階層のみサポートしている.

#### options.trimBr

Paragraph 内の先頭と末尾の `<br>` を取り除く.


## License

MIT License

Copyright (c) 2021 hankei6km

