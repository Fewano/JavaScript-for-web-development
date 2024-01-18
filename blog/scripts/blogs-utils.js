const blogElement = document.getElementById('blog-container')
let blogsRawData = []
let loadingTimeout = {}

// Data map -> for loop/array
// user data ${parameter.object}
function createBlogHTML(blogs){
    const blogContentElement = blogs.map(function(blog) {
    return `<div class="flex flex-col md:flex-row gap-6 w-full">
            <img
            src="${blog.imageUrl}"
            alt="feature image 1"
            class="w-full md:w-auto"
            />
            <div class="flex flex-col gap-4 bg-wd-darkgrey p-6 grow">
            <h3 class="text-2xl font-semibold">
                ${blog.title}
            </h3>
            <p class="text-xl font-light">
                ${blog.description}
            </p>
            <p>${blog.publishedDate}</p>
            <a href="${blog.url}"> Read more</a>
            </div>
            </div>`
    }).join('')
    blogElement.innerHTML = blogContentElement
}

// Search
function searchBlogs(element){

    clearTimeout(loadingTimeout)
    blogElement.innerHTML = "Loading..."

    loadingTimeout = setTimeout(() => {
        const filteredBlogs = blogsRawData.filter(function(blog){
            // ใช้เครื่องหมายพิเศษเพื่อดึงข้อมูลสองตัวออกมา
            return blog.description.includes(element.value) || blog.title.includes(element.value)
        })
        createBlogHTML(filteredBlogs)
    }, 2000)

}

// Sort asc(มากไปหาน้อย เก่าไปหาใหม่), dsc(น้อยไปหามา ใหม่ไปหาเก่า)
function sortBlogs(element) {

    const sortedBlogs = blogsRawData.sort(function (blogA,blogB){
        let compareData = new Date(blogA.publishedDate) - new Date(blogB.publishedDate)

        if(element.value === 'desc'){
            compareData = new Date(blogB.publishedDate) - new Date(blogA.publishedDate)
        }

        return compareData
    })

    createBlogHTML(sortedBlogs)
}

async function main() {
    const response = await axios.get('/scripts/blogs.json')
    blogsRawData = response.data
    
    createBlogHTML(blogsRawData)
}

main() 

