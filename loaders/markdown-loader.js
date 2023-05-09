module.exports = source => {
  const formatSource = source.replace(/^\"|\"$/g, '')
  return formatSource;
}