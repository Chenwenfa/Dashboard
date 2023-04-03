export const apiURL = import.meta.env.PROD ? '/api' : '/api';
// 'https://kongfandong.cn'
export const publicPath = import.meta.env.VITE_APP_BUILD_MODE === 'crx' ? './' : '/Dashboard/'
