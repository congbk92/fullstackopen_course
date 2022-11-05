const { count } = require("../model/blog")

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

const mostBlogs = (blogs) => {
  if (blogs.length == 0) return {}
  countBlogs = blogs.reduce((acc, val) => {
    if (val.author in acc) {
      acc[val.author] += 1
    } else {
      acc = {...acc, [val.author]: 1}
    }
    return acc
  }, {})

const countList = Object.keys(countBlogs).map((key) => {return {
                                                        'author': key,
                                                        'blogs': countBlogs[key]}})
return countList.reduce((acc, val) => 
      {return acc.blogs > val.blogs ? acc : val}, countList[0])
}

const mostLikes = (blogs) => {
  if (blogs.length == 0) return {}
  countBlogs = blogs.reduce((acc, val) => {
    if (val.author in acc) {
      acc[val.author] += val.likes
    } else {
      acc = {...acc, [val.author]: val.likes}
    }
    return acc
  }, {})

const countList = Object.keys(countBlogs).map((key) => {return {
                                                        'author': key,
                                                        'likes': countBlogs[key]}})
return countList.reduce((acc, val) => 
      {return acc.likes > val.likes ? acc : val}, countList[0])
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}