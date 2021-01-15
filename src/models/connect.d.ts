import type { Location, History } from 'umi';
import { GlobalModelState } from './global';
import { ConsultModelState } from './consult';
import { QueryModelState } from './query';

export { GlobalModelState, ConsultModelState, QueryModelState };

export type Loading = {
  global: boolean;
  effects: Record<string, boolean | undefined>;
  models: {
    global?: boolean;
    consult?: boolean;
    query?: boolean;
  };
};

export type ConnectState = {
  global: GlobalModelState;
  loading: Loading;
  consult: ConsultModelState;
  query: QueryModelState;
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
