export type comment = {
    id: number,
    post: number,
    parent: number,
    author: number,
    author_name: string,
    author_url: string,
    date: string,
    date_gmt: string,
    content: content,
    link: string,
    status: string,
    type: string,
    author_avatar_urls: avartar,
    meta: any[],
    _link: any
}

export type postcomment = {
    author_name: string,
    post: number,
    content: string,
}
type content = {
    rendered: string
}
type avartar = {
    24: string
    48: string
    96: string
}