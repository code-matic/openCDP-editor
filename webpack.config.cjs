const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = {
  entry: './src/lib.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'react/jsx-runtime': 'react/jsx-runtime', // Important for React 17+
    antd: 'antd',
  },
  externalsPresets: {
  node: true, // For Node.js compatibility
},
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('tailwindcss'), require('autoprefixer')],
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};

module.exports = [
  // ESM build
  {
    ...common,
    mode: 'production',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      library: {
        type: 'module',
      },
      clean: true, // Clean only on the first build
    },
    externalsType: 'module',
    experiments: {
      outputModule: true,
    },
    plugins: [new MiniCssExtractPlugin({ filename: 'index.css' })],
  },
  // CJS build
  {
    ...common,
    mode: 'production',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.cjs',
      library: {
        type: 'commonjs2',
      },
    },
    module: {
      ...common.module,
      rules: common.module.rules.map((rule) => {
        if (rule.test.toString().includes('css')) {
          return {
            test: rule.test,
            use: 'ignore-loader',
          };
        }
        return rule;
      }),
    },
    plugins: [],
  },
];
