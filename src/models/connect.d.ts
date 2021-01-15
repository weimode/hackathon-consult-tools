import type { Location, History } from 'umi';
import { GlobalModelState } from './global';
import { ConsultModelState } from './consult';
import { QueryModelState } from './query';
import { ExpertsModelState } from './experts';

export {
  GlobalModelState,
  ConsultModelState,
  QueryModelState,
  ExpertsModelState,
};

export type Loading = {
  global: boolean;
  effects: Record<string, boolean | undefined>;
  models: {
    global?: boolean;
    consult?: boolean;
    query?: boolean;
    experts?: boolean;
  };
};

export type ConnectState = {
  global: GlobalModelState;
  loading: Loading;
  consult: ConsultModelState;
  query: QueryModelState;
  experts: ExpertsModelState;
};

export type Match<P> = {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
};

export type RouteComponentProps<P> = {
  match: Match<P>;
  location: Location;
  history: History;
  staticContext?: any;
};
