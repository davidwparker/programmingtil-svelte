export function toggleTheme(theme: any, $theme: any): void {
  if ($theme.mode === 'light') {
    theme.set({ ...$theme, mode: 'dark' });
    updateDocument('theme', 'dark', 'light');
  } else {
    theme.set({ ...$theme, mode: 'light' });
    updateDocument('theme', 'light', 'dark');
  }
}

function updateDocument(name: string, klass: string, other: string) {
  document.cookie = `${name}=${klass};path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  document.getElementById('core').classList.remove(other);
  document.documentElement.classList.remove(other);
  document.getElementById('core').classList.add(klass);
  document.documentElement.classList.add(klass);
}
