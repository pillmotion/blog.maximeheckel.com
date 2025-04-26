import {
  styled,
  Grid,
  Flex,
} from '@maximeheckel/design-system';
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from 'motion/react';
import React, { useRef } from 'react';

import Image from 'next/image';

import { HR } from '../HR';

const FooterBlock = styled('footer', {
  transition: '0.5s',
  width: '100%',
  paddingTop: '32px',
  height: 'fit-content',
  zIndex: -1,
  background: 'var(--gray-000)',
  backgroundImage: `
    linear-gradient(oklch(from var(--border-color) l c h / 50%) 1px, transparent 1px),
    linear-gradient(90deg, oklch(from var(--border-color) l c h / 50%) 1px, transparent 1px)
  `,
  backgroundSize: '15.85px 15.85px',
  backgroundPosition: 'center center',
  pointerEvents: 'auto',

  '@md': {
    position: 'sticky',
    bottom: 0,
  },
});

const Footer = (props: { lastUpdated?: string }) => {
  const { lastUpdated: _lastUpdated } = props;

  const footerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const controls = useAnimation();

  useMotionValueEvent(scrollY, 'change', () => {
    const farEnoughToDisplayFooter =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 500;

    if (farEnoughToDisplayFooter) {
      controls.set({
        visibility: 'visible',
      });
    } else {
      controls.set({
        visibility: 'hidden',
      });
    }


  });

  const handleFocus = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'instant',
    });
  };

  return (
    <>
      <FooterBlock
        as={motion.footer}
        ref={footerRef}
        data-testid="footer"
        key="footer"
        initial={{ visibility: 'hidden' }}
        animate={controls}
        onFocus={handleFocus}
      >
        <Grid templateColumns="1fr minmax(auto, 712px) 1fr">
          <Flex
            as={Grid.Item}
            col={2}
            css={{
              padding: 'var(--space-4)',
              background: 'var(--gray-000)',

              '@sm': {
                padding: 'var(--space-5)',
              },
            }}
            direction="column"
            justifyContent="space-evenly"
            gap={5}
          >
            <Grid
              css={{ width: '100%' }}
            >
              <Image src="/static/og/footer-image.jpg" alt="image" width={0} height={0} sizes="(max-width: 768px) 100vw, 712px" style={{ width: '100%', height: 'auto' }} />
            </Grid>
            <HR />
            <Grid css={{ width: '100%' }}>
              <Image src="/static/og/footer-fizzdragon.png" alt="fizzdragon" width={0} height={0} sizes="(max-width: 768px) 100vw, 712px" style={{ width: '100%', height: 'auto' }} />
            </Grid>
          </Flex>
        </Grid>
        <Grid
          css={{
            background: 'var(--gray-000)',
            width: '100%',
            padding: '8px 16px',
            marginTop: '32px',
            height: '88px',

            '@sm': {
              padding: '8px 32px',
            },
          }}
          templateColumns="1fr minmax(auto, 712px) 1fr"
        >
          <Flex
            as={Grid.Item}
            css={{ gap: 'var(--space-4) !important' }}
            justifyContent="center"
            col={2}
          >
            <Image src="/static/favicons/group.png" alt="Logo" width={0} height={0} sizes="513px" style={{ height: '100%', width: 'auto', maxHeight: '40px', maxWidth: '100%' }} />
          </Flex>
        </Grid>
      </FooterBlock>
    </>
  );
};

export default Footer;
