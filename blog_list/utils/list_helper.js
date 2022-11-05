const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes)
              .reduce((acc, val) => {return acc + val}, 0)
}

module.exports = {
  dummy, totalLikes
}