import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';

import { describe, expect, it } from 'vitest';

import buildBlogPostHeadings from '../headings';

describe('buildBlogPostHeadings', () => {
  it('should match snapshot (empty string)', () => {
    expect(
      buildBlogPostHeadings({
        body: {
          raw: ''
        }
      } as Partial<DocumentToCompute> as DocumentToCompute)
    ).toMatchSnapshot();
  });

  it('should match snapshot (one title)', () => {
    expect(
      buildBlogPostHeadings({
        body: {
          raw: '\n# BAR !'
        }
      } as Partial<DocumentToCompute> as DocumentToCompute)
    ).toMatchSnapshot();
  });

  it('should match snapshot (one title, no heading linefeed)', () => {
    expect(
      buildBlogPostHeadings({
        body: {
          raw: '# BAR !'
        }
      } as Partial<DocumentToCompute> as DocumentToCompute)
    ).toMatchSnapshot();
  });

  it('should match snapshot (not a title)', () => {
    expect(
      buildBlogPostHeadings({
        body: {
          raw: '\n####### BAR !'
        }
      } as Partial<DocumentToCompute> as DocumentToCompute)
    ).toMatchSnapshot();
  });

  it('should match snapshot (not a title, no heading linefeed)', () => {
    expect(
      buildBlogPostHeadings({
        body: {
          raw: '####### BAR !'
        }
      } as Partial<DocumentToCompute> as DocumentToCompute)
    ).toMatchSnapshot();
  });

  it('should match snapshot (melting pot from hell)', () => {
    expect(
      buildBlogPostHeadings({
        body: {
          raw: '\n# BAR !\n\nFOO  \nBAR !\n\n```ts\nfunction foo() {\n  konsole.log(\'BAR\');\n}\n```\n\n## FOO !\n\nFOO !\n\n<Image src="/foo/bar.svg" width="42" height="69" alt="FOO" priority />\n\n### BAR\n\n&nbsp;  \n&nbsp;  \n&nbsp;\n\n#### HAHAHAHA\n\n##### HHHHAAAAAAAAAAAAAAAAAAAA\n\n###### HHHHHHHAAAAAAAAAAAAAAAAA\n\n#### HAHAHAHA\n\n###### HHHHHHHAAAAAAAAAAAAAAAAA\n\n##### HHHHAAAAAAAAAAAAAAAAAAAA\n\n###### HHHHHHHAAAAAAAAAAAAAAAAA\n\n### FOO !\n\n# BAR ### ! ##\n\n## FOO !\n\n####### LOL\n\n# LOL\n\n## LOL\n\n###\n\n## #### LOL\n\n### LOL\n\n#### LOL\n\n##### LOL\n\n###### LOL\n\n####### LOL ##\n\n<InviteTheBotButton />\n'
        }
      } as Partial<DocumentToCompute> as DocumentToCompute)
    ).toMatchSnapshot();
  });

  it('should match snapshot (melting pot from hell, no heading linefeed)', () => {
    expect(
      buildBlogPostHeadings({
        body: {
          raw: '# BAR !\n\nFOO  \nBAR !\n\n```ts\nfunction foo() {\n  konsole.log(\'BAR\');\n}\n```\n\n## FOO !\n\nFOO !\n\n<Image src="/foo/bar.svg" width="42" height="69" alt="FOO" priority />\n\n### BAR\n\n&nbsp;  \n&nbsp;  \n&nbsp;\n\n#### HAHAHAHA\n\n##### HHHHAAAAAAAAAAAAAAAAAAAA\n\n###### HHHHHHHAAAAAAAAAAAAAAAAA\n\n#### HAHAHAHA\n\n###### HHHHHHHAAAAAAAAAAAAAAAAA\n\n##### HHHHAAAAAAAAAAAAAAAAAAAA\n\n###### HHHHHHHAAAAAAAAAAAAAAAAA\n\n### FOO !\n\n# BAR ### ! ##\n\n## FOO !\n\n####### LOL\n\n# LOL\n\n## LOL\n\n###\n\n## #### LOL\n\n### LOL\n\n#### LOL\n\n##### LOL\n\n###### LOL\n\n####### LOL ##\n\n<InviteTheBotButton />\n'
        }
      } as Partial<DocumentToCompute> as DocumentToCompute)
    ).toMatchSnapshot();
  });
});
