import ICacheProvider from '../models/ICacheProvider';

interface ICacheData {
    [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
    private cache: ICacheData = {};

    public async save<T>(key: string, value: T): Promise<void> {
        this.cache[key] = JSON.stringify(value);
    }

    public async getValue<T>(key: string): Promise<T | null> {
        const value = this.cache[key];

        if (!value) {
            return null;
        }

        const parsedValue = JSON.parse(value) as T;

        return parsedValue;
    }

    public async invalidate(key: string): Promise<void> {
        delete this.cache[key];
    }

    public async invalidatePrefix(prefix: string): Promise<void> {
        const keys = Object.keys(this.cache).filter(key =>
            key.startsWith(`${[prefix]}:`),
        );

        keys.forEach(key => {
            delete this.cache[key];
        });
    }
}
