export class BaseData {
  constructor(data: Record<string, any>) {
    for(const field in data) {
      // @ts-ignore
      this[field] = data[field]
    }
  }
}
