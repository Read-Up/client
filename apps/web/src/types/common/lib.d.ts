import "ky";
import "@tanstack/react-table";

declare module "ky" {
  interface Options {
    cache?: "force-cache" | "no-store";
    next?: NextFetchRequestConfig;
  }
}

declare module "@tanstack/react-table" {
  export interface TableMeta<TData extends unknown> {
    addRow: (row?: TData) => void;
    deleteRow?: (...idx: number[]) => void;
    updateData: (rowIndex: number, columnId: string, value: any) => void;
    insertData?: (data: TData[]) => void;
  }
}
