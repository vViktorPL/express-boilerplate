import { AwilixContainer } from "awilix";
import { Connection } from "typeorm";
import { Decoder } from "smartly-typed-decoder";
import { AxiosRequestConfig } from "axios";

declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

declare global {
  namespace NodeJS {
    interface Global {
      container: AwilixContainer;
      dbConnection: Connection;
    }
  }
}

declare module "axios" {
  interface AxiosRequestConfigWithDecoder<T> extends AxiosRequestConfig {
    decoder: Decoder<any, T>;
  }

  interface AxiosInstance {
    request<T = any> (config: AxiosRequestConfigWithDecoder<T>): Promise<AxiosResponse<T>>;
    get<T = any>(url: string, config?: AxiosRequestConfigWithDecoder<T>): Promise<AxiosResponse<T>>;
    delete<T = any>(url: string, config?: AxiosRequestConfigWithDecoder<T>): Promise<AxiosResponse<T>>;
    head<T = any>(url: string, config?: AxiosRequestConfigWithDecoder<T>): Promise<AxiosResponse<T>>;
    options<T = any>(url: string, config?: AxiosRequestConfigWithDecoder<T>): Promise<AxiosResponse<T>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfigWithDecoder<T>): Promise<AxiosResponse<T>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfigWithDecoder<T>): Promise<AxiosResponse<T>>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfigWithDecoder<T>): Promise<AxiosResponse<T>>;
  }

}