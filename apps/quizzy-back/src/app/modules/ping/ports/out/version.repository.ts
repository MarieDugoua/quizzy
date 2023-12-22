export const VersionRepository = Symbol('VersionRepository');
export interface VersionRepository {
    getVersion(): Promise<string>;
}