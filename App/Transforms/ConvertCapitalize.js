export default (uncapitalized: string) => {
const name = uncapitalized.toLowerCase()
const names = name.split(' ')
const capitalized = names.map((name) => name.substring(1,1).toUpperCase() + name.substring(2));

return capitalized
}