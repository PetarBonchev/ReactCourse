export interface Validator<T> {
  validate(entity: T): Promise<void>;
}
