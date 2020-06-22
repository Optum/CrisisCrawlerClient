export interface FilterModel {
    _index: string,
    _type: string,
    _id: string,
    _score: number,
    _source: _source
}

export interface _source {
    filter_type: string,
    filter_values: string[]
}
