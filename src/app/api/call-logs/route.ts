export async function GET(){
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    return fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))
}