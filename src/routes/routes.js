const { getAllBookHandler , addBookHandler , getBookByIdHandler , editBookByIdHandler , deleteBookHandler} = require("../handler/Books.Handler");

const routes = [
    {
        method : "GET",
        path: "/books",
        handler : getAllBookHandler
    },
    { 
        method : "POST",
        path : "/books",
        handler : addBookHandler
    },
    { 
        method : "GET",
        path : "/books/{id}",
        handler : getBookByIdHandler
    },
    {
        method : "PUT",
        path : "/books/{id}",
        handler : editBookByIdHandler
    },
    {
        method : "DELETE",
        path : "/books/{id}",
        handler : deleteBookHandler
    }
]


module.exports = routes;