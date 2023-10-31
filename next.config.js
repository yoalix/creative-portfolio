/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config, { isServer }) => {
    // shader support
    config.module.rules.push(
      ...[
        {
          test: /\.(glsl|vs|fs|vert|frag|gltf)$/,
          exclude: /node_modules/,
          use: ["raw-loader", "glslify-loader"],
        },
      ]
    );

    return config;
  },
};

module.exports = nextConfig;
