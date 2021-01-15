import request from '@/utils/request';

export async function fetchReport(reportUuid: string) {
  return request(`/sciplus/callcenter/findReportInfo?reportId=${reportUuid}`);
}

export async function fetchDisease() {
  return request('/disease/list', {
    method: 'post',
    params: {},
  });
}

export async function searchScholarByPreId(preferredId: string) {
  return request(`/stkos/searchScholarByPreId?preferredId=${preferredId}`);
}

type QueryParams = {
  pageNum: number;
  pageSize: number;
  query: string;
  queryEn: string;
};

export async function query(params: QueryParams) {
  return request('/search/list', {
    method: 'POST',
    data: params,
  });
}

export async function queryNameList(name: string) {
  return request(`/stkos/completionKeyword?keyword=${name}`);
}

export async function searchAllScholars() {
  return request('/stkos/searchAllScholars');
}
