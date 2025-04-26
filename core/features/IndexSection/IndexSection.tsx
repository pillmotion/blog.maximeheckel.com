import { Box, Flex, Grid, Text } from '@maximeheckel/design-system';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./Scene').then((mod) => mod.Scene), {
  ssr: false,
});

const IndexSection = () => {
  return (
    <>
      <Scene />
      <Grid.Item
        col={2}
        justifySelf="center"
        css={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'center',
          minHeight: 'clamp(400px, 90dvh, 900px)',
        }}
      >
        <Box
          id="index"
          css={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            pointerEvents: 'auto',
            zIndex: 1,
            height: 170,
            width: 380,
            paddingTop: 24,
            maskImage: 'radial-gradient(ellipse, black 50%, transparent 72%)',
          }}
        >
          <Text
            as="h1"
            css={{
              letterSpacing: '-1.5px',
              lineHeight: 1.2,
              maxWidth: 400,
              textWrap: 'balance',
              textAlign: 'center',
            }}
            family="serif"
            size="8"
            variant="primary"
            weight="3"
          >
            全球AIGC视听内容共创平台
          </Text>
        </Box>
      </Grid.Item>
      <Grid.Item col={2} justifySelf="center">
        <Flex css={{ maxWidth: 450, padding: '0 16px' }}>
          <Text
            as="p"
            css={{
              textAlign: 'center',
              textWrap: 'balance',
              letterSpacing: '-1.0px',
            }}
            variant="secondary"
            size="4"
            weight="3"
          >
            江苏有线 FizzDragon 沸腾宇宙影业全球AIGC视听内容共创平台，以技术赋能创作，降低门槛、提升效率。通过专业影视训练AIGC能力，实现跨地域、跨主体进行电影、影视剧片等专业内容协作共创。平台集成多模态内容生成编辑功能，支持文本、图像、音频、视频创作与二次加工。
            <br />
            <br />
          </Text>
        </Flex>
      </Grid.Item>
    </>
  );
};

export { IndexSection };
