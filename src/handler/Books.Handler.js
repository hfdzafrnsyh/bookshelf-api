const { nanoid } = require("nanoid");
const books = require("../entities/Books");



// POST BOOK
const addBookHandler = (request , res) => {

    const { name , year , author , summary,publisher,pageCount,readPage, reading }  = request.payload;

    const id = nanoid(16);
    const finished =  pageCount === readPage ? true : false;
    const insertedAt = new Date().toISOString();
    const updateAdd = insertedAt;

    const newBook = {
        id,name,year,author,summary,
        publisher,pageCount,readPage,
        finished,reading,insertedAt,updateAdd

    }



    if(name === undefined){

        const response = res.response({
            status : "fail",
            message : "Gagal menambah Buku. Mohon isi nama buku"
        })
    
        response.code(400);
        return response
    

    }else if(readPage > pageCount){
     
        const response = res.response({
            status : "fail",
            message : "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        })
    
        response.code(400);
        return response
   
    }else if( name != undefined ){

        books.push(newBook);
        books.filter( book => book.id === id ).length > 0;
    
        const response = res.response({
            status : "success",
            message : "Buku berhasil ditambahkan",
            data : {
                bookId : id,
            },
        })
             
        response.code(201);
        return response;

    }

    const response = res.response({
        status : "fail",
        message : "Buku gagal di tambahkan. Kesalahan internal"
    })

    response.code(500);
    return response



}


// GET ALL BOOK
const getAllBookHandler = (request,res) => {

    const  queryName  = request.query.name;
    const  queryReading = request.query.reading;
    const  queryFinished = request.query.finished;
  

    if(queryName !== undefined){
       
        const dataBook = books.filter( book => 
            book.name.toLowerCase().includes(queryName.toLowerCase()),
         )
        .map(  b => ({
            bookId :  b.id,
            name : b.name,
            publisher : b.publisher
        }))
        ;

        const response = res.response({
            status : "success",
            message : "Buku with Query Name",
            data : {
                books : dataBook
            }
        })

        response.code(200);
        return response
    
    }else if(queryReading == 1){

        const dataBook = books.filter( book => 
            book.reading == true
        ).map( b => ({
            bookId : b.id,
            name : b.name,
            publisher : b.publisher
        }))
        
        const response = res.response({
            status : "success",
            message : "Buku with Query Reading , TRUE",
            data : dataBook,
        })

        response.code(200);
        return response;

    }else if(queryReading == 0){
        const dataBook = books.filter( book => 
            book.reading == false
        ).map( b => ({
            bookId : b.id,
            name : b.name,
            publisher : b.publisher
        }))
        
        const response = res.response({
            status : "success",
            message : "Buku with Query Reading , FALSE",
            data : dataBook,
        })

        response.code(200);
        return response;

    }else if(queryFinished == 1 ){
        const dataBook = books.filter( book => 
            book.finished == true
        ).map( b => ({
            bookId : b.id,
            name : b.name,
            publisher : b.publisher
        }))
        
        const response = res.response({
            status : "success",
            message : "Buku with Query Finished ,  TRUE",
            data : dataBook,
        })

        response.code(200);
        return response;

    }else if(queryFinished == 0){

    const dataBook = books.filter( book => 
            book.finished == false
        ).map( b => ({
            bookId : b.id,
            name : b.name,
            publisher : b.publisher
        }))
        
        const response = res.response({
            status : "success",
            message : "Buku with Query Finished , FALSE",
            data : dataBook,
        })

        response.code(200);
        return response;
    }


    const dataBook = books.map(book => ({
        bookId : book.id,
        name : book.name,
        publisher : book.publisher
    }))

    const response = res.response({
    status : "success",
    data : {
        books : dataBook,
    }
  })

 response.code(200);
 return response;


}


// GET BOOK BY ID 
const getBookByIdHandler = (request , res) => {

    const { id } = request.params;

    const book = books.filter( book => book.id === id )[0];

    if( book !== undefined ){
        const response = res.response({
            status : "success",
            data : {
                book,
            }
        })
    
        response.code(200);
        return response;

    }
     
  
    const response = res.response({
        status : "fail",
        message : "Buku tidak ditemukan"
    })

     response.code(404);

     return response;

}


//  PUT BOOKS / EDIT
const editBookByIdHandler = (request , res) => {

    const { id } = request.params;
    const { name , years , author , summary,publisher,pageCount,readPage, reading }  = request.payload;
    const finished = pageCount === readPage ? true : false;
    const updateAdd = new Date().toISOString();

    const index = books.findIndex( book => book.id === id);


   if( name === undefined){
    const response = res.response({
        status : "fail",
        message : "Gagal memperbarui buku. Mohon isi nama buku"
    });

    response.code(400);
    return response;

   }else if(readPage > pageCount){

    const response = res.response({
        status : "fail",
        message : "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
    });

    response.code(400);
    return response;
  
}else if(index !== -1 ){
    books[index] = {
        ...books[index],
        name,
        years,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        updateAdd
    }

    const response = res.response({
        status : "success",
        message : "Buku berhasil diperbarui"
    });

    response.code(200);
    return response;

}

const response = res.response({
    status : "fail",
    message : "Gagal memperbarui buku. Id tidak ditemukan"
});

response.code(404);
return response;

}


// DELETE BOOK
const deleteBookHandler = (request , res) => {
    const { id } = request.params;

    const index = books.findIndex( book => book.id === id );

    if(index !== -1 ){
        books.splice(index , 1);
        const response = res.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
          });
          response.code(200);
          return response;
    }

    const response = res.response({
        status: 'fail',
        message: 'Buku gagal di Hapus. Id tidak ditemukan',
      });
      response.code(404);
      return response;
}





module.exports = {  addBookHandler , getBookByIdHandler , editBookByIdHandler  , deleteBookHandler , getAllBookHandler} 