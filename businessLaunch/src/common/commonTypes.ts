export type IdType = string;

export type Optional<T> = T | undefined;

export interface Identifiable {
  id: IdType;
}

export interface EntityConstructor<V> {
  new (...args: any): V;
  className: string;
}

export type ProjectContent = ImageUrl | Text;

export type ImageUrl = string;

export type Text = string;
