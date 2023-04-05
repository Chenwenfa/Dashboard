export const apiURL = import.meta.env.PROD ? '/kf_api' : '/kf_api';
// 'https://kongfandong.cn'
export const publicPath = import.meta.env.VITE_APP_BUILD_MODE === 'crx' ? './' : '/Dashboard/'
