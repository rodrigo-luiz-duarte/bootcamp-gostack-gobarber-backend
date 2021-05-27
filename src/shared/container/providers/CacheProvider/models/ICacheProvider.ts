export default interface ICacheProvider {
    save<T>(key: string, value: T): Promise<void>;
    getValue<T>(key: string): Promise<T | null>;
    invalidate(key: string): Promise<void>;
    invalidatePrefix(prefix: string): Promise<void>;
}
