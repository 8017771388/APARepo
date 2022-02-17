export interface IGenericSearch {
    id: string;
    name: string;
}

export class GenericSearch implements IGenericSearch {

    constructor(public id = null,
        public name = '') {
    }
}
