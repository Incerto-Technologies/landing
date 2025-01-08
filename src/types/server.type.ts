import { Host, HostTag } from './host.types';
import { HostListWithLabels, LabelHostsMappingList } from './type';

// =============== HOST ===============
export interface AddHostFormData extends Host {
  password: string;
  pemfile?: FileList | undefined;
}

export type HostListWithLabelResponse = ApiResponse<HostListWithLabels>;

// =============== LABEL ===============
export type AddLabelApiRequest = Omit<
  HostTag,
  'id' | 'createdAt' | 'updatedAt'
>;

export interface AddLabelsToHostsApiRequest {
  labelIds: string[];
  hostIds: string[];
}

export interface LabelHostsMappingData {
  labels: LabelHostsMappingList;
}

export type LabelHostsMappingApiResponse = ApiResponseWithoutData &
  LabelHostsMappingData;

// =============== API RESPONSE ===============

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export type ApiResponseWithoutData = Omit<ApiResponse<null>, 'data'>;
