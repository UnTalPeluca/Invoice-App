
const uid = () => {
    const tail = Math.random().toString(36).substr(2);
    return tail.substring(0, 6).toUpperCase()
}

export default uid

