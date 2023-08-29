const Blog_data = require('../blog.json')

const log = require('./logger')();

module.exports.init = async () => {
	log.info('Initialize tools module ...');
};

const getBlogs = async (
    title,
    categories
) => {

    try {
        const blogs = Blog_data['posts']
        let data = []
        await Promise.all(blogs.map(blog => new Promise(async resolve => {
            if(categories !== null && categories.length !== 0){
                for(i=0;i<categories.length;i++){
                    if(blog['categories'].includes(categories[i])){
                        if(title !== null){
                            if(blog['title'].toLowerCase().includes(title)){
                                data.push(blog)
                            }
                        }
                        else data.push(blog);
                        break;
                    }
                }
            }
            else{
                if(title !== null){
                    if(blog['title'].toLowerCase().includes(title)){
                        data.push(blog)
                    }
                }
                else{
                    data.push(blog)
                }
            }
            resolve()
        })))
        return data;
    } catch (e) {
        log.error(e);
    }

    return null;
}

module.exports.getBlogs = getBlogs;
