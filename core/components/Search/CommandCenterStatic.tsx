import {
  css,
  Flex,
  Icon,
  Text,
} from '@maximeheckel/design-system';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';

import { ChartLine, Folder, Plus } from './Icons';
import * as S from './Search.styles';
import { MAX_HEIGHT } from './constants';
import useIndexItem from './useIndexItem';

const commandCenterStaticWrapper = css({
  maxHeight: `${MAX_HEIGHT}px`,
  overflowY: 'auto',
  padding: '0 8px',
});

const items = [
  'aimode-tools',
  'home-navigation',
  'design-navigation',
  'twitter-social-link',
  'email-link',
  'roadmap-link',
  'maximeheckelcom-link',
  'rss-link',
];

interface CommandCenterStaticProps {
  collapse: boolean;
  onItemClick: (item: string) => void;
}

const CommandCenterStatic = (props: CommandCenterStaticProps) => {
  const { collapse, onItemClick } = props;
  const [hidden, setHidden] = useState(false);

  const [
    selectedResult,
    previousResult,
    nextResult,
    // setSelectedResult,
  ] = useIndexItem(items);

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          (
            document.getElementById(selectedResult)?.children[0] as HTMLElement
          ).click();
          break;
        case 'ArrowUp':
          event.preventDefault();
          previousResult();
          break;
        case 'ArrowDown':
          event.preventDefault();
          nextResult();
          break;
        default:
      }
    },
    [previousResult, nextResult, selectedResult]
  );

  useEffect(() => {
    if (selectedResult) {
      document
        .getElementById(selectedResult)
        ?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedResult]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleKey]);

  useEffect(() => {
    if (collapse) {
      setTimeout(() => {
        setHidden(true);
      }, 500);
    } else {
      setHidden(false);
    }
  }, [collapse]);

  return (
    <motion.div
      initial={false}
      animate={{
        height: collapse ? 0 : 468,
      }}
      transition={{ ease: 'easeInOut' }}
      style={{
        backgroundColor: 'var(--background)',
        borderBottomLeftRadius: 'var(--border-radius-2)',
        borderBottomRightRadius: 'var(--border-radius-2)',
        overflow: 'hidden',
        border: collapse ? 'none' : '1px solid var(--border-color)',
      }}
    >
      <div aria-hidden={hidden} className={commandCenterStaticWrapper()}>
        <S.Separator>项目管理</S.Separator>
        <S.Item
          data-testid="aimode"
          id="aimode-tools"
          key="aimode-tools"
        >
          <Flex
            as="button"
            css={{ cursor: 'pointer' }}
            data-testid="aimode-button"
            onClick={() => {
              onItemClick('');
            }}

          >
            <Folder />
            <Text
              as="span"
              css={{ margin: '0 8px', textAlign: 'left', flex: 1 }}
              size="1"
              weight="3"
            >
              任务模板库（即将上线，敬请期待）
            </Text>
          </Flex>
        </S.Item>
        <S.Item
          data-testid="aimode"
          id="aimode-tools"
          key="aimode-tools"
        >
          <Flex
            as="button"
            css={{ cursor: 'pointer' }}
            data-testid="aimode-button"
            onClick={() => {
              onItemClick('');
            }}
          >
            <Plus />
            <Text
              as="span"
              css={{ margin: '0 8px', textAlign: 'left', flex: 1 }}
              size="1"
              weight="3"
            >
              任务创建与分配（即将上线，敬请期待）
            </Text>
          </Flex>
        </S.Item>
        <S.Item
          data-testid="aimode"
          id="aimode-tools"
          key="aimode-tools"
        >
          <Flex
            as="button"
            css={{ cursor: 'pointer' }}
            data-testid="aimode-button"
            onClick={() => {
              onItemClick('');
            }}
          >
            <ChartLine />
            <Text
              as="span"
              css={{ margin: '0 8px', textAlign: 'left', flex: 1 }}
              size="1"
              weight="3"
            >
              工作量测算与资源规划（即将上线，敬请期待）
            </Text>
          </Flex>
        </S.Item>
        <S.Separator>导航</S.Separator>
        <S.Item
          data-testid="design"
          data-selected={selectedResult === 'design-navigation'}
          id="design-navigation"
          key="design-navigation"
        >
          <Link href="https://web.app.visionlinkmedia.cn/sltv/HB/2025/JSCNAIPlatform/index.html#/" passHref target="_blank">
            <Icon.Arrow size={4} />
            <span style={{ marginLeft: '16px' }}>AI中控台</span>
          </Link>
        </S.Item>
      </div>
      {/* <S.ShortcutList>
        <Flex alignItems="center">
          <Text as="span" css={{ opacity: 0.7 }} size="1" variant="tertiary">
            Cmd
          </Text>
          <Flex>
            <S.KBD>
              <Command width="16" height="16" />
            </S.KBD>
            <S.KBD>K</S.KBD>
          </Flex>
        </Flex>
        <Flex alignItems="center">
          <Text as="span" css={{ opacity: 0.7 }} size="1" variant="tertiary">
            Theme
          </Text>
          <Flex>
            <S.KBD>
              <Command width="16" height="16" />
            </S.KBD>
            <S.KBD>T</S.KBD>
          </Flex>
        </Flex>
        <Flex alignItems="center">
          <Text as="span" css={{ opacity: 0.7 }} size="1" variant="tertiary">
            Open
          </Text>
          <Flex>
            <S.KBD>
              <Icon.Enter size="4" />
            </S.KBD>
          </Flex>
        </Flex>
      </S.ShortcutList> */}
    </motion.div>
  );
};

export { CommandCenterStatic };
