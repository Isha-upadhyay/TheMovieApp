export function getKeyValue(object: any, key: string): any {
    if(object===undefined)
        return undefined;
    if (object.hasOwnProperty(key))
        return object[key];
    else return undefined;
}
export const options: object = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDU5NjQxMTY3MjI3YjA3ZDJhNWVkZjgzZDZlOTczMCIsInN1YiI6IjY0Nzk4YWIyY2FlZjJkMDBjMjk5NTljOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CjKZMhqaOHP6C63nj6MjSxBDDLnR6-dgrzo7CsWcL3U'
    }
};