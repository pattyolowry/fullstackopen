const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((s,blog) => {
        return s + blog.likes
    }, 0)
    return total
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((p, n) => {
        if (!p || p.likes < n.likes) {
            return n
        } else {
            return p
        }
    }, null)
    return favorite
}

module.exports = { dummy, totalLikes, favoriteBlog }