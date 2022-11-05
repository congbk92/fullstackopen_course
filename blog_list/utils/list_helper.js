const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes)
              .reduce((acc, val) => {return acc + val}, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length == 0) return {}
  return blogs.reduce((acc, val) => {return acc.likes > val.likes ? acc : val}, blogs[0])
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}