import {
  Box,
  Card,
  Flex,
  Anchor,
  Pill,
  Tooltip,
  Button,
  Text,
} from '@maximeheckel/design-system';
import { motion, AnimatePresence } from 'motion/react';
import { MDXRemoteSerializeResult, MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react';

import CopyToClipboardButton from '../Buttons/CopyToClipboardButton';
import MDXComponents from '../MDX/MDXComponents';
import RotatingShine from '../RotatingShine';
import { Coffee } from './Icons';
import { SearchError, Status } from './types';

interface AIPromtResultCardProps {
  error: SearchError | null;
  status: Status;
  query: string;
  streamData: string;
  onQuestionSelect: (question: string) => void;
}

const SAMPLE_QUESTIONS = [
  // 'React Three Fiber',
  // 'Framer Motion',
  '多模态内容生成如何实现？用单一模型还是多模型协作？',
  '版权保护采用哪些技术（如区块链）？',
  "二次创作如何避免侵权？有无合规检测？",
  '盈利模式是订阅、付费还是分成？',
  "如何吸引品牌方入驻？有无精准匹配？",
  '如何保障创作者持续收益？分成机制是否透明？',
  'AI会否导致作品同质化？如何保护原创性？',
  "人机协作的边界如何定义？是否削弱手工价值？",
  '如何促进跨文化内容融合（多语言/符号生成）？',
  "全球化中如何应对地区合规差异（数据隐私、文化禁忌）？",
];

// eslint-disable-next-line react/display-name
const AIPromptResultCard = forwardRef(
  (props: AIPromtResultCardProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { error, streamData, query, status, onQuestionSelect } = props;

    const [mdxData, setMdxData] = useState<MDXRemoteSerializeResult<
      Record<string, unknown>,
      Record<string, unknown>
    > | null>(null);
    const responseBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (responseBodyRef.current) {
        responseBodyRef.current.scrollTop = 0;
      }
    }, []);

    useEffect(() => {
      const serializeStreamData = async () => {
        const mdxSource = await serialize(streamData, {
          mdxOptions: { development: process.env.NODE_ENV === 'development' },
        });
        const responseBody = responseBodyRef.current;
        setMdxData(mdxSource);

        // Keep response div scrolled to the bottom but wait 200 to let other transition take place before scrolling
        if (status === 'loading') {
          setTimeout(() => {
            responseBody?.scrollTo({
              top: responseBody.scrollHeight,
              behavior: 'smooth',
            });
          }, 100);
        }
      };

      serializeStreamData();
    }, [streamData, status]);

    const list = {
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 0.2,
          staggerChildren: 0.1,
        },
      },
      hidden: {
        opacity: 0,
      },
    };

    const item = {
      visible: { opacity: 1, x: 0 },
      hidden: { opacity: 0, x: -10 },
    };

    return (
      <Card
        as={motion.div}
        data-testid="ai-prompt-result-card"
        initial={{ y: 0, opacity: 0, height: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          height: 500,
          transition: {
            delay: 0.6,
            ease: 'easeInOut',
            opacity: {
              delay: 1.2,
            },
          },
        }}
        exit={{
          y: -500,
          opacity: 0.1,
          height: 0,
        }}
        css={{
          width: '100%',
          color: 'var(--text-secondary)',
          background: 'var(--background)',
          'p, li, strong, em': {
            margin: '0px 0px 1rem',
            fontSize: 'var(--font-size-1)!important',
          },
          code: {
            fontSize: 'var(--font-size-1)',
          },
          'div:has(> pre)': {
            marginBottom: 'var(--space-5)',
          },
          overflow: 'visible',
        }}
        transition={{
          duration: 0.3,
          delay: 0.1,
          ease: 'easeIn',
        }}
      >
        <Box css={{ borderRadius: 'inherit', height: '100%' }} ref={ref}>
          <RotatingShine status={status} />
          <Card.Body
            ref={responseBodyRef}
            css={{
              padding: 24,
              maxHeight: 500,
              height: '100%',
            }}
            data-testid="ai-prompt-serialized-response"
            style={{ overflowY: status === 'loading' ? 'hidden' : 'auto' }}
          >
            <AnimatePresence initial={false}>
              {query ? (
                <Text
                  as={motion.em}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.5 },
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  exit={{
                    opacity: 0.2,
                    y: -30,
                    transition: {
                      ease: 'easeInOut',
                      duration: 0.3,
                    },
                  }}
                  key={query}
                  variant="tertiary"
                >
                  &quot;{query}&quot;
                </Text>
              ) : null}
              {!streamData && !query && status === 'initial' ? (
                <Flex
                  as={motion.div}
                  direction="column"
                  justifyContent="space-between"
                  gap="5"
                  exit={{
                    y: 20,
                    opacity: 0,
                    transition: {
                      ease: 'easeInOut',
                      duration: 0.2,
                    },
                  }}
                >
                  <Text as="p" size="2">
                    通过输入您的问题或选择下面的一个示例来询问有关技术、艺术或商业的任何问题。我将根据您的问题提供最相关的答案。
                  </Text>
                  <Flex wrap="wrap" gap="3">
                    {SAMPLE_QUESTIONS.map((question) => (
                      <Box
                        as="button"
                        css={{
                          padding: 0,
                          MozAppearance: 'none',
                          WebkitAppearance: 'none',
                          background: 'transparent',
                          color: 'inherit',
                          border: 'none',
                          fontFamily: 'inherit',
                        }}
                        key={question}
                        onClick={() => onQuestionSelect(question)}
                      >
                        <Pill css={{ cursor: 'pointer' }} variant="info">
                          {question}
                        </Pill>
                      </Box>
                    ))}
                  </Flex>
                  <Text as="p" size="2">
                    结果并不保证100%准确，但我正在努力提高答案的质量，内容仅供参考，请仔细甄别。
                    <br />
                    <br />功能即将上线，敬请期待！
                  </Text>
                </Flex>
              ) : null}
            </AnimatePresence>
            {error ? (
              <Text as="p" size="2" variant="danger">
                {error.status} {error.statusText}. Please give it another try
                later.
              </Text>
            ) : null}
            {mdxData ? (
              <MDXRemote
                compiledSource={mdxData.compiledSource}
                scope={{}}
                frontmatter={{}}
                components={MDXComponents}
              />
            ) : null}
            <AnimatePresence initial={false}>
              {status === 'done' ? (
                <Flex alignItems="baseline" direction="column" gap="3">
                  <Box
                    animate="visible"
                    as={motion.ul}
                    css={{
                      listStyle: 'none',
                      padding: 0,
                    }}
                    exit="hidden"
                    initial="hidden"
                    variants={list}
                  >
                    {/* {sources.map((source) => (
                      <Box as={motion.li} key={source.url} variants={item}>
                        <Anchor
                          href={source.url}
                          rel="nooepener noreferrer"
                          target="_blank"
                        >
                          {source.title}
                        </Anchor>
                      </Box>
                    ))} */}
                    <Box as={motion.li} variants={item}>
                      <Flex alignItems="center" gap="2">
                        <Tooltip content="Copy output to clipboard">
                          <Box>
                            <CopyToClipboardButton
                              title="Copy output to clipboard"
                              text={streamData}
                            />
                          </Box>
                        </Tooltip>
                        <Tooltip content="Support my work: buy me a coffee!">
                          <Anchor
                            href="https://www.buymeacoffee.com/maximeheckel"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Button
                              aria-label="Support my work: buy me a coffee!"
                              icon={<Coffee />}
                              variant="icon"
                            />
                          </Anchor>
                        </Tooltip>
                      </Flex>
                    </Box>
                  </Box>
                </Flex>
              ) : null}
            </AnimatePresence>
          </Card.Body>
        </Box>
      </Card>
    );
  }
);

export default AIPromptResultCard;
