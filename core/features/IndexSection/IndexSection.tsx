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
            江苏有线X映宇宙全球AIGC视听内容共创平台旨在通过技术手段降低创作门槛，提升创作效率，促进不同地区、企业或个人创作者之间的协作与交流。平台支持在线提交合作需求或加入创作者库，为合作伙伴提供多样化的AIGC服务，包括项目承接、内容协同创作，以及提供联合运营、技术创作培训、IP资源共享等合作机会。
            <br />
            <br />
            平台集成多种功能，包括：多模态内容生成与编辑：能够生成和编辑文本、图像、音频、视频等多种内容形式，支持二次创作。多人协作与资源共享：允许团队成员实时共享创作进度和结果，共享创作空间，提升团队协作效率。版权保护与商业化应用：链接品牌方、制作机构和媒体等需求方，为创作者提供合作机会，并制定审核标准以确保作品的合法合规性。平台可广泛应用于教育、传媒、设计、娱乐等多个领域，为有专业交付和商业交付需求的海量创作者提供一站式的解决方案。
          </Text>
        </Flex>
      </Grid.Item>
    </>
  );
};

export { IndexSection };
