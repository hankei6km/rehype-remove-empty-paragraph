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
