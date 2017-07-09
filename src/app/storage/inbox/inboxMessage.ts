
class UserAgent {
  public className: string;
  constructor(in_ClassName: string) {
    this.className = in_ClassName;
  }
}

export class InboxMessage {
  public _storage: any;
  public _temp: any;
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
    return date.toLocaleString('ru-RU');
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
  get props(): any {
    let result = [];

    if (this._storage.user) {
      result.push({
        key: 'user',
        title: 'User',
        value: this._storage.user
      });
    }

    if (this._storage.from) {
      result.push({
        key: 'from',
        title: 'Sender',
        value: this._storage.from
      });
    }

    if (this._storage.to) {
      result.push({
        key: 'to',
        title: 'Recipient',
        value: this._storage.to
      });
    }

    if (this._storage.service) {
      result.push({
        key: 'service',
        title: 'Service',
        value: this._storage.service
      });
    }

    if (this._storage.agent) {
      result.push({
        key: 'agent',
        title: 'Agent',
        value: this._storage.agent
      });
    }
    if (this._storage.dst_host) {
      result.push({
        key: 'dst_host',
        title: 'Host',
        value: this._storage.dst_host
      });
    }
    if (this._storage.src_ip) {
      result.push({
        key: 'src_ip',
        title: 'From IP-adress',
        value: this._storage.src_ip
      });
    }

    return result;
  }

  get id(): string {
    return this._storage._id || -1;
  }
  get body(): string {
    return this._storage.body;
  }
  get typeClass(): string {
    if (this._storage.channel === 'web') {
      return 'fa fa-globe'; }
    return 'fa fa-envelope-o';
  }

  get userAgentPresent(): boolean {
    if (this._storage.user_agent === undefined) {
      return false;
    }

    if (this._temp === undefined) {
      this._temp = {};
    }

    if (this._temp.userAgent !== undefined) {
      return true;
    }

    let out = new Array<UserAgent>();
    let ua = this._storage.user_agent;
    if (ua.os !== undefined) {
      if (ua.os.family !== undefined) {

        if (ua.os.family.indexOf('Mac') !== -1
        || ua.os.family.indexOf('iOS') !== -1) {
          out.push(new UserAgent('fa-apple'));
        }

        if (ua.os.family.indexOf('Windows') !== -1) {
          out.push(new UserAgent('fa-windows'));
        }
      }
    }

    if (ua.ua !== undefined) {
      if (ua.ua.family !== undefined) {

        if (ua.ua.family.indexOf('Firefox') !== -1) {
          out.push(new UserAgent('fa-firefox'));
        }

        if (ua.os.family.indexOf('Chrome') !== -1) {
          out.push(new UserAgent('fa-chrome'));
        }

        if (ua.os.family.indexOf('IE') !== -1 ||
        ua.os.family.indexOf('Edge') !== -1) {
          out.push(new UserAgent('fa-internet-explorer'));
        }
      }
    }

    this._temp.userAgent = out;
    return true;
  }

  get userAgentElems(): Array<UserAgent> {
    return this._temp.userAgent;
  }
}
