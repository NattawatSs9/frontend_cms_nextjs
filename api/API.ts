const BASE_URL = "https://fswd-wp.devnss.com/wp-json/wp/v2/"

export const API = {
    POST : {
        GETALL : "https://fswd-wp.devnss.com/wp-json/wp/v2/posts",
        GET : "https://fswd-wp.devnss.com/wp-json/wp/v2/posts/", // + id
    },
    CATEGORY : {
        GETALL : "https://fswd-wp.devnss.com/wp-json/wp/v2/categories",
        GET: "https://fswd-wp.devnss.com/wp-json/wp/v2/categories/" // + id
    },
    TAG: {
        GETALL : "https://fswd-wp.devnss.com/wp-json/wp/v2/tags",
        GET: "https://fswd-wp.devnss.com/wp-json/wp/v2/tags/" // + id
    },
    PAGE: {
        GETALL : "https://fswd-wp.devnss.com/wp-json/wp/v2/pages",
        GET: "https://fswd-wp.devnss.com/wp-json/wp/v2/pages/" // + id
    },
    COMMENT: {
        GETALL : "https://fswd-wp.devnss.com/wp-json/wp/v2/comments",
        CREATE:  "https://fswd-wp.devnss.com/wp-json/wp/v2/comments",
        GET: "https://fswd-wp.devnss.com/wp-json/wp/v2/comments/" // + id
    },
    USER: {
        GETALL: "https://fswd-wp.devnss.com/wp-json/wp/v2/users",
        GET: "https://fswd-wp.devnss.com/wp-json/wp/v2/users/" // + id
    }
}