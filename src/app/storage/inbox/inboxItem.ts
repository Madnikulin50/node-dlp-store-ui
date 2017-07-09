
export class InboxItem {
  public _storage: any;

  constructor(in_Storage: Object) {
    this._storage = in_Storage;
  }
  get subject(): string {
    return this._storage.subject || '';
  }
  get date(): string {
    if (this._storage.date === undefined) {
      return '';
    }
    let date = new Date(this._storage.date);
    return date.toLocaleDateString('ru-RU');
  }
  get from(): string {
    if (this._storage.user !== undefined &&
      this._storage.user) {
      return this._storage.user;
    }
    if (this._storage.from !== undefined &&
      this._storage.from) {
      return this._storage.from;
    }
    if (this._storage.src_ip !== undefined &&
        this._storage.src_ip) {
      return this._storage.src_ip;
    }
    return 'Unknown';
  }
  get to(): string {
    if (this._storage.to !== undefined &&
      this._storage.to) {
      return this._storage.to;
    }

    if (this._storage.dst_host !== undefined &&
      this._storage.dst_host) {
      return this._storage.dst_host;
    }
    return '';
  }
  get id(): string {
    return this._storage._id || -1;
  }
  get typeClass(): string {
    if (this._storage.channel === 'web') {
      return 'fa fa-globe';
    }
    return 'fa fa-envelope-o';
  }
}
