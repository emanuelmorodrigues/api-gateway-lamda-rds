module.exports = function (event) {
    const routeKey = event.routeKey
    if (routeKey == "GET /tasks") {
        return "select * from task.Tasks;"
    }
    if (routeKey == "POST /task") {
        let params = event.queryStringParameters
        let id = params.id
        let title = params.title
        let content = params.content
        let duedate = params.duedate

        return `INSERT INTO Tasks(id, title, content, duedate) VALUES (${id}, ${title}, ${content}, ${duedate})`

    }
    else if (routeKey == "GET /task/{id}") {
        const id = event.pathParameters.id
        return `select * from task.Tasks where id = ${id};`
    }
    else if (routeKey == "DELETE /task/{id}") {
        const id = event.pathParameters.id
        return `delete from task.Tasks where id = ${id};`
    }

}