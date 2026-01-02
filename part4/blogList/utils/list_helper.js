const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((s,blog) => {
        return s + blog.likes
    }, 0)
    return total
}

module.exports = { dummy, totalLikes }