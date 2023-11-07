export function loadSetting<T>(key: string, defaultValue: T): T {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : defaultValue;
}

export function saveSetting<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}
