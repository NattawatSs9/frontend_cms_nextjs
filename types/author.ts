export type author = {
    id: string,
    name: string,
    url: string,
    description: string,
    link: string,
    slug: string,
    avatar_urls: avartar,
    meta: Array<string>,
    _links: link
}

type avartar = {
    24: string
    48: string
    96: string
}

type link = {
    self: Array<href>,
    collection: Array<href>
}


type href = {
    href: string
}