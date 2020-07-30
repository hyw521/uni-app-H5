const accessToken = 'accessToken'





export function setAccessToken(token) {
  return uni.setStorageSync(accessToken, token);
}

export function getAccessToken() {
  return uni.getStorageSync(accessToken)
}
