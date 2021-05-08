import unified from 'unified';
import rehypeParse from 'rehype-parse';
import stringify from 'rehype-stringify';
import rehypeRemoveEmptyParagraph from '.';

describe('removeBlankTransformer()', () => {
  const f = async (html: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeRemoveEmptyParagraph)
        .use(stringify)
        .freeze()
        .process(html, (err, file) => {
          if (err) {
            reject(err);
          }
          resolve(String(file));
        });
    });
  };
  it('should not trim leading/trailing <br> element', async () => {
    expect(await f('<p><br>test1<br></p>')).toEqual('<p><br>test1<br></p>');
  });
  it('should remove blank paragraph', async () => {
    expect(await f('<p></p>')).toEqual('');
    expect(await f('<p><br></p>')).toEqual('');
    expect(await f('<p>test1</p><p><br></p><p>test2</p>')).toEqual(
      '<p>test1</p><p>test2</p>'
    );
    expect(await f('<p><br>test3</p><p><br><br></p><p>test4<br></p>')).toEqual(
      '<p><br>test3</p><p><br><br></p><p>test4<br></p>'
    );
  });
});

describe('removeBlankTransformer() with trimBr', () => {
  const f = async (html: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeRemoveEmptyParagraph, { trimBr: true })
        .use(stringify)
        .freeze()
        .process(html, (err, file) => {
          if (err) {
            reject(err);
          }
          resolve(String(file));
        });
    });
  };
  it('should trim leading/trailing <br> element', async () => {
    expect(await f('<p>test2<br></p>')).toEqual('<p>test2</p>');
    expect(await f('<p><br>test3</p>')).toEqual('<p>test3</p>');
    expect(await f('<p><br><br>test4<br>test5<br><br></p>')).toEqual(
      '<p>test4<br>test5</p>'
    );
    expect(
      await f('<p><br><br>test6<br>test7<br><br></p><p>test8<br><br></p>')
    ).toEqual('<p>test6<br>test7</p><p>test8</p>');
  });
  it('should remove blank paragraph', async () => {
    expect(await f('<p><br>test3</p><p><br><br></p><p>test4<br></p>')).toEqual(
      '<p>test3</p><p>test4</p>'
    );
  });
});
