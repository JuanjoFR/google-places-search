import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  // Versión simplificada sin parámetros de tipo no utilizados
  interface ColumnMeta {
    viewDropdownDisplayName?: string;
  }
}
