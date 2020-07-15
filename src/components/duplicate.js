export default function duplicate(Object1, Object2) {

    const Object = [].concat(Object1, Object2)
    const unique =  Object.map(e => e['key'])

    .map((e, i, final) => final.indexOf(e) === i && i)

    .filter((e) => Object[e]).map(e => Object[e]);


    // console.log(unique)
    return unique
}
