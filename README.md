# rehype-remove-empty-paragraph

[rehype](https://github.com/rehypejs/rehype) plugin that remove `<p></p>` / `<p><br></p>`.

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

Remove `<p></p>` / `<p><br></p>`.
Paragraph is only supported `root / paragraph` hierarchy.

#### options.trimBr

Trim leading/trailing `<br>` in Paragraph.


## License

MIT License

Copyright (c) 2021 hankei6km

