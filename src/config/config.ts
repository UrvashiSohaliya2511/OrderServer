import mongoose from "mongoose"
mongoose.set( "strictQuery", false );
const connect = async () => {
  return await mongoose.connect('mongodb+srv://KointrackAssignment:nXDO3PELy5Ym5pJf@cluster0.3irrbqb.mongodb.net/?retryWrites=true&w=majority');
}
export default connect;
