export interface Repository<T> {
  getAll: () => Promise<T[]>
  getOne: (id: number) => Promise<T>
}

export default Repository
