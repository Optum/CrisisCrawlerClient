export interface ResultModel {
    _index: string,
    _type: string,
    _id: string,
    _score: number,
    _source: _source
}

export interface _source {
    state: string,
    channel: string,
    contenttype: string,
    contentdiff: string, 
    county: string,      
    createdatetime: string,
    htmldiff: string,
    url: string,
    previewText: previewText
}

export interface previewText {
    title: string,
    description: string,
    image: string,
    website: string
}
