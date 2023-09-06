type TNextConfig = {
  SERVER_SIDE_PATHNAME_HEADER_NAME: string;
};

export const NextConfig: TNextConfig = {
  SERVER_SIDE_PATHNAME_HEADER_NAME: 'x-url'
} as const;

export default NextConfig;
