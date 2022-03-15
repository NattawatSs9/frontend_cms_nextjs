import { type } from "os"

export type post = {
    id: number,
    date: string,
    date_gmt: string,
    guid: guid
    modified: string,
    modified_gmt: string,
    slug: string,
    status: string,
    type: string,
    link: string,
    title: title,
    content: content,
    excerpt: content,
    author: string,
    featured_media: number,
    comment_status : string,
    ping_status: string,
    sticky : boolean,
    template: string,
    format: string,
    meta: any[],
    categories: number[],
    tags: number[],
    _link: any
}

type guid = {
    rendered: string
}

type title = {
    rendered: string
}

type content = {
    rendered: string,
    protected: boolean
}

