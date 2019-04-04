export interface TemplateField {
    name: string;
    type: string;
    displayName?: string;
    section?: string;
    source?: string;
    required?: boolean;
  }
  
  export interface Template {
    name: string;
    fields?: TemplateField[];
    route?: boolean;
    defaultRoute?: boolean;
    insertOptions?: string[];
    id?: string;
    displayName?: string;
    icon?: string;
    inherits?: string[];
  }
  
  export interface Placeholder {
    name: string;
    displayName?: string;
    id?: string;
  }
  
  export interface RenderingParam {
    name: string;
    type: string;
    value: string;
  }
  
  export interface Rendering {
    name?: string;
    displayName?: string;
    icon?: string;
    exposedPlaceholders?: string[];
    dataSourceTemplate?: string;
    graphQLQuery?: string;
    params?: RenderingParam[];
    renderingName?: string;
    placeholderKey?: string;
    placeholderName?: string;
    dataSource?: DataSource;
    renderingParams?: any[];
    uid?: string;
  }
  
  export interface DataSourceField {
    name: string;
    value: any;
  }
  
  export interface DataSource {
    name: string;
    displayName: string;
    template: string;
    fields: DataSourceField[];
    resolvedFromItemId?: string;
    copy?: boolean;
  }
  
  export interface Layout {
    renderings: Rendering[];
    placeholders: string[];
  }
  
  export interface RouteField {
    name: string;
    value: string;
  }

  export interface Route {
    id?: string;
    displayName?: string;
    name?: string;
    layout?: Layout;
    fields?: RouteField[];
    children?: Route[];
    template?: string;
  }
  
  export interface NonRoute {
    name: string;
    displayName: string;
    template: string;
    children: Route[];
  }
  
  export interface Items {
    routes: Route[];
    nonRoutes: NonRoute[];
  }
  
  export interface Dictionary {
    key: string;
    value: string;
  }
  
  export interface ImportRoot {
    templates: Template[];
    placeholders: Placeholder[];
    appName: string;
    language: string;
    renderings: Rendering[];
    wipeExisting: boolean;
    items: Items;
    dictionary: Dictionary[];
  }
  