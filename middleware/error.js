import ErrorResponse from '../utils/errorresponse.js';


const errorHandler = (err, req, res, next) =>{

    let error = {...err};
    error.message = err.message;

    //Mongoose Duplicate Key
    if(err.code === 11000){
        console.log(err.message)
        var z = err.message
        var re = z.split(" ");
        console.log(re);
        // const message = 'the" + re[7] + "Duplicate Value';
        // error = new ErrorResponse(message,400)
        error = new ErrorResponse("the entered "+ re[11]+  "duplicate value" , 400)
    };
    //mongoose validation error
    if(err.name ==='ValidationError'){
        const message = Object.values(err.errors).map(val=> val.message)
        error = new ErrorResponse(message, 400)
      };
  
      res.status( error.statusCode || 500).json({
          sucess: false,
          error:error.message || 'Server Error'
      });

}
export default errorHandler;