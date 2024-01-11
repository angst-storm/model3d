import type * as CSS from 'csstype';

declare module 'csstype' {
    interface Properties {
        '--grid-column-from'?: number;
        '--grid-column-to'?: number;
    }
}
