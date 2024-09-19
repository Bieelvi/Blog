import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function ShowMarkdown({ postModel, ...props }) {
    return (
        <Markdown
            h1= 'h2'
            className="prose dark:prose-invert max-w-none"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
                code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');

                    const customStyle = {
                        backgroundColor: 'transparent',
                        width: '100%',
                    };

                    return !inline && match ? (
                        <SyntaxHighlighter style={dracula} customStyle={customStyle} PreTag="div" language={match[1]} {...props}>
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                }
            }}>
            {postModel.article}
        </Markdown>
    );
}