

import { compile } from 'ejs';
import { camelCase } from './../../utils/camel-case'
const generateComponent = compile(
`
export interface <%= name %> {
<% fields.forEach(function(field){ %>
    <%= field.name %>: <%- field.type %>;
<% }); %>
}
`);


interface Ctx {
    name: string;
    fields: Array<{
        name: string;
        type: string;
    }>
}

export function generate(ctx: Ctx, options: any) {
    if(options?.interfaceNameCamelCase) {
        ctx.name = camelCase(ctx.name);
    }

    return generateComponent(ctx)
}





