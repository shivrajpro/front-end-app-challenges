export class Note {
    constructor(private _id?: number, public title?: string, public description?: string,
        public isPinned?: boolean, public isActive?: boolean, public isSaved?: boolean) {
        this._id = _id || Math.floor(Math.random() * Date.now());
        this.title = title || '';
        this.description = description || '';
        this.isPinned = isPinned || false;
        this.isActive = isActive || false;
        this.isSaved = isSaved || false;
    }

    get id() {
        return this._id;
    }
}