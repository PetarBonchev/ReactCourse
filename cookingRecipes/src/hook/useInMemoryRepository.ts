import { useMemo, useState } from "react";
import type {
  EntityConstructor,
  Identifiable,
  IdType,
} from "../common/commonTypes";
import type { Validator } from "../model/validator";
import { API } from "../service/apiClient";

const useInMemoryRepository = <T extends Identifiable>(
  ctor: EntityConstructor<T>,
  validator?: Validator<T>
) => {
  const [entitiesMap, setEntitiesMap] = useState<Map<IdType, T>>(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const entities = useMemo(
    () => Array.from(entitiesMap.values()),
    [entitiesMap]
  );

  const validateEntity = async (entity: T): Promise<void> => {
    if (validator) {
      await validator.validate(entity);
    }
  };

  const findAll = async (): Promise<T[]> => {
    setIsLoading(true);
    try {
      const data = await API.findAll(ctor);
      const newMap = new Map(data.map((entity) => [entity.id, entity]));
      setEntitiesMap(newMap);
      setError(null);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const findById = async (id: IdType): Promise<T | undefined> => {
    if (entitiesMap.has(id)) {
      return entitiesMap.get(id);
    }

    setIsLoading(true);
    try {
      const entity = await API.findById(ctor, id);
      const newMap = new Map(entitiesMap).set(entity.id, entity);
      setEntitiesMap(newMap);
      setError(null);
      return entity;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const create = async (entity: Omit<T, "id">): Promise<T> => {
    setIsLoading(true);
    try {
      await validateEntity(entity as T);
      const { id, ...dto } = entity as any;
      const created = await API.create(ctor, dto);
      const newMap = new Map(entitiesMap).set(created.id, created);
      setEntitiesMap(newMap);
      setError(null);
      return created;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (entity: T): Promise<T> => {
    try {
      await validateEntity(entity);
      const updated = await API.update(ctor, entity);
      const newMap = new Map(entitiesMap).set(updated.id, updated);
      setEntitiesMap(newMap);
      setError(null);
      return updated;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteById = async (id: IdType): Promise<void> => {
    setIsLoading(true);
    try {
      await API.deleteById(ctor, id);
      const newMap = new Map(entitiesMap);
      newMap.delete(id);
      setEntitiesMap(newMap);
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    entities,
    entitiesMap,
    isLoading,
    error,
    findAll,
    findById,
    create,
    update,
    deleteById,
  };
};

export default useInMemoryRepository;
