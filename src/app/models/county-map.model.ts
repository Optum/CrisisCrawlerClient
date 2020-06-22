export interface countyMapModel {
    _index: string,
    _type: string,
    _id: string,
    _score: number,
    _source: _source
}

export interface _source {
    state: string,
    counties: string[]
}
